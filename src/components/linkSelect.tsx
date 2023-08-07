import React, {useState} from 'react';
import openLinks from '~helpers';

const LinkSelect = (props) => {
	const [url, setURL] = useState('')
	function handleURLadd(e) {
		e.preventDefault()

		try {
			new URL(url)
			props.setURLArray([...props.urlArray, url])
		}
		catch {
			console.log('Careful! This is an invalid URL.')
		}
	}

	function removeURL(index) {
		props.setURLArray(props.urlArray.filter((url, i) => i !== index))
	}



	return (
		<section className={'my-10'}>
			<h1>Links</h1>
		<form onSubmit={handleURLadd}>
			<label htmlFor='link'>Link</label>
			<input id='link' className='border-2' placeholder='Add URL here' value={url} onChange={e => setURL(e.target.value)}></input>
			<button>Add</button>
		</form>
	<h2>Added Links</h2>
	<ul className={'overflow-clip block'}>
		{props.urlArray.map((url, index) => {return (
			<li key={index} id={url} className='hover:bg-gray-400 flex justify-between p-2 group mx-4'>
				<span className={'overflow-ellipsis max-w-[100px]'}>{url}</span>
				<button onClick={()=>removeURL(index)} className='group-hover:block hidden'>Delete</button>
			</li>)})}
	</ul>
	<button className='border-2' onClick={() => openLinks(props.urlArray)}>Test Links</button>
		</section>

	);
};

export default LinkSelect;
