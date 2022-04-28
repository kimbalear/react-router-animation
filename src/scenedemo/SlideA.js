import React from 'react'
import TransitionGroupPlus from 'react-transition-group-plus'
import Metro from 'react-metro'
import Box from './Box'

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
			1
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
			background: backgroundOp
		}}
	/>
)

class SlideA extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			showSequence: false,
			data: [{ name: '🐵' }, { name: '🐶' }, { name: '🐮' }, { name: '🐕' }]
		}
	}

	renderMetroSequence() {
		if (!this.state.showSequence) {
			return null
		}

		const domino = Metro.generateFocusMap(0, 1, this.state.data.length, 'dominoForwards', 1)

		// const props = {
		// 	wrapperType: 'div'
		// }

		return Metro.sequence(this.state.data, domino).map((data, i) => {
			return (
				<Metro.animation {...data}>
					<Box key={i} {...data.content} />
				</Metro.animation>
			)
		})
	}

	rightBox() {
		return (
			<div
				style={{
					display: 'flex',
					width: 200,
					height: 330,
					margin: 20,
					marginLeft: 0,
					background: backgroundOp
				}}>
				<TransitionGroupPlus>{this.renderMetroSequence()}</TransitionGroupPlus>
			</div>
		)
	}

	showSequence() {
		this.setState({ showSequence: true })
	}

	render() {
		return (
			<div style={{ ...containerStyle, background: '#9f85ff' }}>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TransitionGroupPlus>{Metro.bindContainer(this.props.showContent, <Circle />, circleAnim)}</TransitionGroupPlus>
					<TransitionGroupPlus>{Metro.bindContainer(this.props.showContent, <LeftBox />, leftBoxAnim)}</TransitionGroupPlus>
				</div>
				<div>
					<TransitionGroupPlus>
						{Metro.bindContainer(this.props.showContent, this.rightBox(), rightBoxAnim, {
							onMount: this.showSequence.bind(this)
						})}
					</TransitionGroupPlus>
				</div>
			</div>
		)
	}
}

export default SlideA

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
			from: { opacity: 0, x: -50 },
			to: { opacity: 1, x: 0, ease: 'easeInOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				x: 0
			},
			to: {
				opacity: 0,
				x: -50,
				ease: 'easeInOutQuint'
			}
		}
	}
}

const rightBoxAnim = {
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
			from: { opacity: 0, y: 400 },
			to: { opacity: 1, y: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				y: 0
			},
			to: {
				opacity: 0,
				y: 400,
				ease: 'easeInOutQuint'
			}
		}
	}
}
