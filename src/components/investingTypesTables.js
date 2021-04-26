export default function InvestingVehiclesTable(props){
    return(
        <div className="overflow_auto">
        <table>
            <thead>
                <tr>
                    <th>Vehicle Type</th>
                    <th>Funded Money</th>
                    <th className="biggerWidth">Grows (buy & sell)</th>
                    <th>Withdrawals (spendable)</th>
                    <th>Benefits</th>
                    <th>limits /yr</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Traditional 401K </td>
                    <td>Pre-tax </td>
                    <td>Tax-free</td>
                    <td>Future income taxes</td>
                    <td>Tax savings today</td>
                    <td rowSpan="2">Combined 401K total $19,500, 50+: +$5,500</td>

                </tr>
                <tr>
                    <td>Roth 401K</td>
                    <td>Today income taxes</td>
                    <td>Tax-free</td>
                    <td>Tax-free</td>
                    <td>Future Tax savings</td>

                </tr>
                <tr>
                    <td>Traditional IRA</td>
                    <td>Pre-tax </td>
                    <td>Tax-free</td>
                    <td>Future income taxes</td>
                    <td>Tax savings today</td>
                    <td rowSpan="2">Combined IRA total $6,000, 50+: +$1,000</td>

                </tr>
                <tr>
                    <td>Roth IRA</td>
                    <td>Today income taxes</td>
                    <td>Tax-free</td>
                    <td>Tax-free</td>
                    <td>Future tax savings, Withdraw contributions anytime, No MRD</td>

                </tr>
                <tr>
                    <td>HSA</td>
                    <td>Pre-tax </td>
                    <td>Tax-free</td>
                    <td>Tax-free</td>
                    <td>Tax savings today</td>
                    <td>Single: $3,600, Family: $7,200, 50+: +$1,000</td>

                </tr>
                <tr>
                    <td>Taxable</td>
                    <td>Today income taxes</td>
                    <td>Gains taxed</td>
                    <td>Tax-free</td>
                    <td>Potential 0% gains taxes, withdraw at anytime</td>
                    <td>None</td>

                </tr>

            </tbody>

        </table>
        </div>
    )
}