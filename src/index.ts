/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
 import { Client, fetchExchange } from '@urql/core';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const client = new Client({
		  url: 'https://gql.cruisecritic.net/graphql',
		  exchanges: [fetchExchange],
		  fetchOptions: {
		  	headers: {
		  		'Cache-Control': 'no-cache',
		  	}
		  }
		});

		const start = performance.now()

		console.error("here, this should print")
		console.error("this too")

		const responses = await Promise.all(DOCUMENTS.map(async ([query, variables]) => {
			const response = await client.query(query, variables)
			return {data: response.data, error: response.error?.message }
		}))

		const end = performance.now()
		const duration = end - start

		return new Response(`Hello World!
Duration: ${duration}ms
			
${JSON.stringify(responses, null, 2)}`);
	},
};

const DOCUMENTS: [string, Object][] = [
	[
		`
 query ShelfItems($listId: Float!, $countryId: Float!) {
  db {
    listItems(listId: $listId, countryId: $countryId, limit: 9) {
      id
      title
      image
      subjectId
      subjectReferenceId
      destination {
        id
        slug
      }
      departurePort {
        id
        name
      }
      port {
        id
        slug
      }
      ship {
        id
        slug
      }
      cruiseLine {
        id
        slug
      }
    }
  }
}
		`, 
{
  "listId": 67,
  "countryId": 1
}	],
[
	`

query GetPinpointEndpoint($endpoint: String!) {
  personalization {
    getPinpointEndpoint(endpoint: $endpoint) {
      attributes {
        key
        value
      }
      location {
        region
        country
      }
    }
  }
}
	`,
	{
  "endpoint": ""
		
	}
],
[
	`
		
query RecombeeShelfSailings($itineraryId: Float!, $ipCountry: String!) {
  meta {
    sailings(
      itineraryId: $itineraryId
      ipCountry: $ipCountry
      fields: [pricing]
    ) {
      results {
        id
        lowestPrice {
          vendor {
            id
            name
          }
          price {
            url
            price
            priceFormatted
            highestPrice
          }
        }
        meta {
          currency
        }
      }
    }
  }
}
	`,
	{

  "itineraryId": 160319,
  "ipCountry": "US"
		
	}
],
[
	`
query ItineraryFilterOptions($destinationId: [Float!], $departureDate: String, $cruiseLineId: [Float!], $shipId: [Float!], $departurePortId: [Float!], $portId: [Float!], $cruiseLength: [String!], $cruiseStyleId: [Float!], $ipCountry: String!, $countryId: Float!) {
  meta {
    itineraries(
      filters: {fields: [filters], cruiseStyleId: $cruiseStyleId, destinationId: $destinationId, length: $cruiseLength, cruiseLineId: $cruiseLineId, departurePortId: $departurePortId, portId: $portId, shipId: $shipId, departureDate: $departureDate}
      ipCountry: $ipCountry
    ) {
      filters {
        destinations {
          totalResults
          results {
            id
            name
            totalResults
          }
        }
        departureMonths {
          results {
            id
            name
            totalResults
          }
        }
        cruiseLines {
          results {
            id
            name
            totalResults
          }
        }
        ships {
          results {
            id
            name
            totalResults
          }
        }
        departurePorts {
          totalResults
          results {
            id
            name
            totalResults
          }
        }
        lengths {
          results {
            id
            name
            totalResults
          }
        }
        ports {
          results {
            id
            name
            totalResults
          }
        }
        lifestyles {
          results {
            id
            name
            totalResults
          }
        }
      }
    }
  }
  db {
    popularCruiseLines: listItems(countryId: $countryId, listId: 3) {
      id
      cruiseLine {
        id
        name
      }
    }
    popularDeparturePorts: listItems(countryId: $countryId, listId: 18) {
      id
      departurePort {
        id
        name
      }
    }
  }
}
		
	`,
	{

	"countryId": 1,
	"ipCountry": "US"
		
	}
],
[
	`

query RecombeeShelfSailings($itineraryId: Float!, $ipCountry: String!) {
  meta {
    sailings(
      itineraryId: $itineraryId
      ipCountry: $ipCountry
      fields: [pricing]
    ) {
      results {
        id
        lowestPrice {
          vendor {
            id
            name
          }
          price {
            url
            price
            priceFormatted
            highestPrice
          }
        }
        meta {
          currency
        }
      }
    }
  }
}
	`,
	{

  "itineraryId": 183793,
  "ipCountry": "DE"
		
	}
],
[
	`
query RecombeeShelfSailings($itineraryId: Float!, $ipCountry: String!) {
  meta {
    sailings(
      itineraryId: $itineraryId
      ipCountry: $ipCountry
      fields: [pricing]
    ) {
      results {
        id
        lowestPrice {
          vendor {
            id
            name
          }
          price {
            url
            price
            priceFormatted
            highestPrice
          }
        }
        meta {
          currency
        }
      }
    }
  }
}
		
	`,
	{

  "itineraryId": 191978,
  "ipCountry": "DE"
		
	}
],
[
	`
		query RecombeeShelfSailings($itineraryId: Float!, $ipCountry: String!) {
  meta {
    sailings(
      itineraryId: $itineraryId
      ipCountry: $ipCountry
      fields: [pricing]
    ) {
      results {
        id
        lowestPrice {
          vendor {
            id
            name
          }
          price {
            url
            price
            priceFormatted
            highestPrice
          }
        }
        meta {
          currency
        }
      }
    }
  }
}

	`,
	{

  "itineraryId": 125386,
  "ipCountry": "DE"
		
	}
],
[
	`
		
query RecombeeShelfSailings($itineraryId: Float!, $ipCountry: String!) {
  meta {
    sailings(
      itineraryId: $itineraryId
      ipCountry: $ipCountry
      fields: [pricing]
    ) {
      results {
        id
        lowestPrice {
          vendor {
            id
            name
          }
          price {
            url
            price
            priceFormatted
            highestPrice
          }
        }
        meta {
          currency
        }
      }
    }
  }
}
	`,
	{

  "itineraryId": 200374,
  "ipCountry": "DE"
		
	}
],
[
	`
query PersonalizeUserRecommendations($userId: String!, $campaign: String!) {
  personalization {
    getPersonalizeUserRecommendations(userId: $userId, campaign: $campaign) {
      itemList {
        itemId
      }
    }
  }
}
		
	`,
	{

  "campaign": "destination",
  "userId": ""
		
	}
],
[
	`
query PersonalizeUserRecommendations($userId: String!, $campaign: String!) {
  personalization {
    getPersonalizeUserRecommendations(userId: $userId, campaign: $campaign) {
      itemList {
        itemId
      }
    }
  }
}
		
	`,
	{

  "campaign": "destination",
  "userId": "93dd0945-0f52-4fb5-9f65-b2201eb4b9e6"
		
	}
]
]
