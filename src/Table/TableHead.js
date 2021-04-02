


const TableHead = ({heading}) =>{
    return (
        <>
            <tr>
                {
                    heading.map(el => {
                        return (
                            <th key={el}>{el}</th>
                        )
                    })
                }
            </tr>
        </>
    )
}

export default TableHead;