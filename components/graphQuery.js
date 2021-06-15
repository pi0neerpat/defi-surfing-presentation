import React from "react"
import axios from 'axios'

const NETWORK_NAME = 'goerli'
const GRAPH_API_BASE_URL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-"
const USER_ADDRESS = "0x000deb0c92e6d3da7f77ed01b8473b3f7f4efc39"
const QUERY_URL = GRAPH_API_BASE_URL + NETWORK_NAME
const graphQuery = `
{
    account(id: "${USER_ADDRESS}") {
        flowsOwned {
            flowRate
            sum
            lastUpdate
        }
    }
  }
`

const GraphQuery = () => {
    const [data,setData] = React.useState({})

    const loadData = async () => {
        const result = await axios.post(QUERY_URL, { query: graphQuery })
      
        // const indexerStats = result.data.data.account
        console.log(result);
        setData(result.data.data)
    }

    React.useEffect(()=>{
        loadData()
    })
    return (<>
    Results for {USER_ADDRESS} on network {NETWORK_NAME}
    {JSON.stringify(data)}
    </>)
}

export default GraphQuery