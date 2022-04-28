import React from 'react'
import TransitionGroupPlus from 'react-transition-group-plus'
import Metro from 'react-metro'

const Circle = () => (
	<div
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: 200,
			height: 150
		}}>
		<div
			style={{
				display: 'flex',
				width: 90,
				height: 90,
				background: backgroundOp,
				borderRadius: 9999,
				alignSelf: 'center',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: 60,
				color: colorOp
			}}>
			2
		</div>
	</div>
)

const LeftBox = () => (
	<div
		style={{
			display: 'flex',
			margin: '20px auto 0 auto',
			width: 150,
			height: 180,
			flexDirection: 'row'
		}}>
		<div style={{ display: 'flex', flex: 1, marginRight: 20, background: backgroundOp }} />
		<div style={{ display: 'flex', flex: 1, background: backgroundOp }} />
	</div>
)

const RightBox = () => (
	<div
		style={{
			display: 'flex',
			width: 200,
			height: 330,
			margin: 20,
			marginLeft: 0,
			flexDirection: 'row'
		}}>
		<div style={{ display: 'flex', flex: 2, marginRight: 20, background: backgroundOp }} />
		<div style={{ display: 'flex', flex: 1, background: backgroundOp }} />
	</div>
)

const SlideB = ({ showContent }) => {
	return (
		<div style={{ ...containerStyle, background: '#FFC107' }}>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<TransitionGroupPlus>{Metro.bindContainer(showContent, <Circle />, circleAnim)}</TransitionGroupPlus>
				<TransitionGroupPlus>{Metro.bindContainer(showContent, <LeftBox />, leftBoxAnim)}</TransitionGroupPlus>
			</div>
			<div>
				<TransitionGroupPlus>{Metro.bindContainer(showContent, <RightBox />, rightBoxAnim)}</TransitionGroupPlus>
			</div>
		</div>
	)
}

export default SlideB

const containerStyle = {
	display: 'flex',
	flexDirection: 'row',
	background: '#582EBA',
	overflow: 'hidden'
}
const backgroundOp = 'rgba(255,255,255,0.3'
const colorOp = 'rgba(255, 255, 255, 1'

// animations
const circleAnim = {
	animation: {
		out: {
			time: 1
		},
		in: {
			time: 1,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, scale: 1, y: -150 },
			to: { opacity: 1, scale: 1, y: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				scale: 1
			},
			to: {
				opacity: 0,
				scale: 1,
				y: -150,
				ease: 'easeOutQuad'
			}
		}
	}
}

const leftBoxAnim = {
	animation: {
		out: {
			time: 1,
			delay: 0.2
		},
		in: {
			time: 1,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, scale: 0 },
			to: { opacity: 1, scale: 1, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				scale: 1
			},
			to: {
				opacity: 0,
				scale: 0,
				ease: 'easeInOutQuint'
			}
		}
	}
}

const rightBoxAnim = {
	animation: {
		out: {
			time: 1,
			delay: 0
		},
		in: {
			time: 1,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, x: 400 },
			to: { opacity: 1, x: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				x: 0
			},
			to: {
				opacity: 0,
				x: 400,
				ease: 'easeInOutQuint'
			}
		}
	}
}
