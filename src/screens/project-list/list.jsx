export const List = ({ list, users }) => {
    return <table>
        <thead>
            <tr>
                <td>项目名称</td>
                <td>负责人</td>
            </tr>
        </thead>
        <tbody>
            {
                list.map(item => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{users.find(user => user.id === item.personId)?.name || '未知'}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
}