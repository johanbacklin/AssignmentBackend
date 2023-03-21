const FriendsTodoItem = (props) => {
  const { title, description, created_at, updated_at, completed, username } =
    props.todo;

  return (
    <div className="todo-container">
      <div className="todo-image-container">
        <h3 className="friend-todo">User: {username}</h3>
        <div className="friend-todo">Title: {title}</div>
        <div className="friend-todo ">Description: {description}</div>
        <div className="friend-todo">Created: {created_at}</div>
        <div className="friend-todo">Updated: {updated_at}</div>
        <div className="friend-todo">Status: {completed}</div>
      </div>
    </div>
  );
};

export default FriendsTodoItem;
