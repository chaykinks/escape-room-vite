function Spinner(): JSX.Element {
  return (
    <div
      style={{
        fontSize: '28px',
        fontWeight: 500,
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
      }}
    >
      Загрузка...
    </div>
  );
}

export default Spinner;
