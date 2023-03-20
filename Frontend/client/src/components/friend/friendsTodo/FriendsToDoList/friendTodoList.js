import FriendsTodoItem from "../FriendsToDoItem/friendTodoItem";

const FriendsTodoList = (props) => {
  return (
    <div>
      {props.todoList.map((todo) => (
        <FriendsTodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default FriendsTodoList;
