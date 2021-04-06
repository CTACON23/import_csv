


const TableHead = ({heading}) =>{
    return (
        <>
            <tr>
                {
                    heading.map(el => {
                        return (
                            el !== heading[heading.length-1] ?  <th key={el}>{el}</th> : false
                        )
                        
                    })
                }
            </tr>
        </>
    )
}

export default TableHead;