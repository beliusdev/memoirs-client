function Button(props) {
  return (
    <button
      className={`button button--${props.type ? props.type : 'primary'}`}
      {...props}
    >
      {props.children}
    </button>
  );
}

export default Button;
