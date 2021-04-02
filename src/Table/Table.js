import './Table.css';
import state from 'states-us'

import TableHead from './TableHead'
import states from 'states-us';


const Table = ({data}) =>{
    const validateAge = (age) => {
        const example1 = states.filter((x) => x.contiguous);
        console.log(example1);
        return age.isInteger || age >= 21
    }
    const validateExp = (exp,age) => {
        return exp.isInteger || age >= exp
    }
    const validateYearIncome = (income) => {
        income = Number.parseFloat(income)
        if(typeof income === 'number'){
            return income >= 0
        }
        return false
    }
    const validateState = (state) => {
        const stateArray = state.split()
        console.log(stateArray)
    }
    return(
        <>
            <table>
                <tbody>
                    <TableHead heading = {Object.keys(data[0])}/>
                {
                    data.map(el => {
                        return (
                            <tr key ={el.ID}>
                                <td>{el['ID']}</td>
                                <td>{el['Full Name']}</td>
                                <td className={el['Duplicate with'].context === 'phone' ? 'error' :''}>{el['Phone']}</td>
                                <td className={el['Duplicate with'].context === 'email' ? 'error' :''}>{el['Email']}</td>
                                <td className={validateAge(el['Age']) ? '' : 'error'}>{el['Age']}</td>
                                <td className={validateExp(el['Experience'],el['Age']) ? '' : 'error'}>{el['Experience']}</td>
                                <td className={validateYearIncome(el['Yearly Income']) ? '' : 'error'}>{Number.parseFloat(el['Yearly Income']).toFixed(2)}</td>
                                <td>{el['Has children']}</td>
                                <td className={validateState(el['License states'])}>{el['License states']}</td>
                                <td>{el['Expiration date']}</td>
                                <td>{el['License number']}</td>
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