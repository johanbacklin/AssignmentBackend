const FriendsTodoItem = (props) => {
  const { title, description, created_at, updated_at, completed, username } =
    props.todo;

  return (
    <div className="todo-container">
      <div className="todo-image-container">
        <h3 className="todo-user">User: {username}</h3>
        <h3 className="todo-title">Title: {title}</h3>
        <div className="todo-description">Description: {description}</div>
        <div className="todo-created">Created: {created_at}</div>
        <div className="todo-updated">Updated: {updated_at}</div>
        <div className="todo-status">Status: {completed}</div>
      </div>
    </div>
  );
};

export default FriendsTodoItem;
