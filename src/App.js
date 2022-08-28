import './App.css';
import { useSelector, useDispatch, connect } from 'react-redux'
import { clearData, fetchData, incrementId, decrementId, inputId } from './features/dataSlice'
import { useEffect } from 'react';

function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  

  const renderImg = () => {
    if(data.apiData) {
      console.log(data.apiData)
      return <img style={{'width': '80vw', 'height': '' }} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }

  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(decrementId())}>Back</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
      </div>
      <input value={ data.objectId } onChange={(e) => dispatch(inputId(Number(e.target.value)))} />
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
      </div>
      <div>
        {data.apiData ? <p>{data.apiData.title}</p> : <p>loading...</p>}
        {data.apiData ? <p>{data.apiData.artistDisplayName}</p> : null}
        <div className='frame'>
          {renderImg()}
        </div>
      </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({ objectId: state.data.objectId })

export default connect(mapStateToProps)(App);















