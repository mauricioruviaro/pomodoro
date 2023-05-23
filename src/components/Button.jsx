function Button({ onClick, classes, text }) {
  return (
    <button
      type="button"
      className={ classes }
      onClick={ onClick }
    >
      { text }
    </button>
  );
}

export default Button;
