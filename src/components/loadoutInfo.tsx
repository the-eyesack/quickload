import moment from "moment"

export default function LoadoutInfo(props) {
    if(props.triggerTime.length !== 0)
    return (
        <div className='border-2 my-2 rounded-md p-1'>
        <span><i>{props.loadout}</i> is set to fire at:</span>
        <ul>
        {props.triggerTime.map((item) => {
        return <li>{moment(item).format('dddd, h:mm:ss a')}</li>
      })}
            </ul>

      </div>
    )
}