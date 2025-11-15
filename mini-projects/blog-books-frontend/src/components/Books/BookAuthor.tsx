import { useSelector } from "react-redux";
import { selectAllUsers } from "../../slice/UsersSlice";

interface Props {
    userId: number;
}

const BookAuthor: React.FC<Props> = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const selectedUser = users.find((user) => user.id === userId);

    return (
      <div key={userId}>by {selectedUser ? selectedUser.name : "Unknown author"}</div>
    );
}
export default BookAuthor