import './Table.css';
import TableHead from './TableHead'



const Table = ({data}) =>{
    
    return(
        <>
            <table className="table table-light  table-bordered border-primary table-hover col-md-8">
                <tbody>
                    <TableHead heading = {Object.keys(data[0])}/>
                {
                    data.map(el => {
                        return (
                            <tr key ={el.ID}>
                                <td>{el['ID']}</td>
                                <td>{el['Full Name']}</td>
                                <td className={el.errors.indexOf('phone') !== -1 ? 'error' : ''}>{el['Phone']}</td>
                                <td className={el.errors.indexOf('email') !== -1 ? 'error' : ''}>{el['Email']}</td>
                                <td className={el.errors.indexOf('Age') !== -1 ? 'error' : ''}>{el['Age']}</td>
                                <td className={el.errors.indexOf('Exp') !== -1 ? 'error' : ''}>{el['Experience']}</td>
                                <td className={el.errors.indexOf('Income') !== -1 ? 'error' : ''}>{Number.parseFloat(el['Yearly Income']).toFixed(2)}</td>
                                <td className={el.errors.indexOf('Children') !== -1 ? 'error' : ''}>{el['Has children']}</td>
                                <td className={el.errors.indexOf('State') !== -1 ? 'error' : ''}>{el['License states']}</td>
                                <td className={el.errors.indexOf('ExpDate') !== -1 ? 'error' : ''}>{el['Expiration date']}</td>
                                <td className={el.errors.indexOf('License') !== -1 ? 'error' : ''}>{el['License number']}</td>
                                <td>{el['Duplicate with'].ids.join()}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default Table;