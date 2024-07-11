import { ethers } from 'ethers'
import dotenv from 'dotenv'
import VaultFacetABI from './constants/abis/VaultFacetABI.json'

dotenv.config()

const { RPC_URL, PRIVATE_KEY, DIAMOND } = process.env

async function rebalance() {
	try {
		let tx, txr
		const provider = new ethers.JsonRpcProvider(RPC_URL)
		const signer = new ethers.Wallet(PRIVATE_KEY || '', provider)
		const tradeFacet = new ethers.Contract(DIAMOND || '', VaultFacetABI, signer)

		tx = await tradeFacet.Compartmentalise()
		await tx.wait(1)

		console.log('Rebalancing Triggered Successfully 🚀🚀🚀')
	} catch (error) {
		console.error('Error Calling Rebalancing Function', error)
	}
}

rebalance()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
