import { useAsync } from "../../hooks/use-async";
import { userService } from "../../services/user-service";

export function Users() {
    const { data, loading, error }
        = useAsync(async () => await userService.loadUsers(), []);

    return (
        <div>
            {loading && <div>loading</div>}
            {data && data.map((user) => {
                return (<div key={user.username}>
                    {user.username}
                </div>)
            })}
        </div>
    )
}