/**
 * SimplePrice is the type definition for the expected response structure from
 * the getSimplePrice method.
 */
type SimplePrice = {
	[cryptoCurrencyId: string]: {
		[currency: string]: number
	}
}

/**
 * CoinGeckoAPI id s light-weight SDK to interface with the Coin Gecko API on
 * the free tier.
 */
class CoinGeckoAPI {
	/**
	 * getSimplePrice fetches the current price of a cryptocurrency in any
	 * other supported currency.
	 *
	 * @param id is an array of all the cryptocurrency id's.
	 * @param currency is an array of all the currency values.
	 *
	 * @example
	 * With params id=['ethereum'] and currency=['usd'] the expected json result would be:
	 * {
	 *   "ethereum": {
	 *     "usd": 1566.43
	 *   }
	 * }
	 */
	static async getSimplePrice(id: string[], currency: string[] = ['usd']): Promise<SimplePrice|undefined> {
		try {
			// free tier implementation
			const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id.join(',')}&vs_currencies=${currency.join(',')}`)
			return res.json()
		} catch(err) {
			// explicitly return undefined when there is an error with the request.
			console.error('Error:CoinGeckoAPI:', err)
			return undefined
		}
	}
}

export {
	CoinGeckoAPI
}