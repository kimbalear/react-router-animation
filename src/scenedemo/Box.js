import React from 'react'

class Box extends React.Component {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flex: 1,
					marginBottom: 0,
					background: 'transparent',
					border: '1px solid rgba(255,255,255,0)',
					boxSizing: 'border-box',
					paddingTop: 5,
					width: 200,
					fontSize: 50,
					justifyContent: 'center'
				}}>
				{this.props.name}
			</div>
		)
	}
}

export default Box
