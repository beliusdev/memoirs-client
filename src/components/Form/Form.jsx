function Form(props) {
  return (
    <form className='form' {...props}>
      {props.children}
    </form>
  );
}

export default Form;
