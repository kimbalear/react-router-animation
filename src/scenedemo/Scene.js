import React from 'react'
import TransitionGroupPlus from 'react-transition-group-plus'
import Metro from 'react-metro'
import SlideA from './SlideA'
import SlideB from './SlideB'
import SlideC from './SlideC'

class Scene extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			animating: false,
			activeSlideIndex: 0,
			slides: [
				{
					containerVisible: false,
					childrenVisible: false,
					component: SlideA,
					animation: slideContainerAAnim,
					text: 'Creating advanced scene transitions is easy with Metro´s built in sequence & container methods.'
				},
				{
					containerVisible: false,
					childrenVisible: false,
					component: SlideB,
					animation: slideContainerBAnim,
					text: 'Every scene in this demo is simply a container wrapping other containers and sequences'
				},
				{
					containerVisible: false,
					childrenVisible: false,
					component: SlideC,
					animation: slideContainerCAnim,
					text: 'React Metro <3'
				}
			]
		}

		this.inbetweenSlides = 400
		this.nextSlide = this.nextSlide.bind(this)
		this.previousSlide = this.previousSlide.bind(this)
	}

	componentDidMount() {
		this.updateSlides('next', 0)
	}

	nextSlide() {
		if (!this.state.isAnimating) {
			const last = this.state.activeSlideIndex
			this.setState(
				{
					isAnimating: true,
					activeSlideIndex: this.state.activeSlideIndex < this.state.slides.length - 1 ? this.state.activeSlideIndex + 1 : 0
				},
				() => this.updateSlides('next', last)
			)
		}
	}

	previousSlide() {
		if (!this.state.isAnimating) {
			const last = this.state.activeSlideIndex
			this.setState(
				{
					isAnimating: true,
					activeSlideIndex: this.state.activeSlideIndex > 0 ? this.state.activeSlideIndex - 1 : this.state.slides.length - 1
				},
				() => this.updateSlides('previous', last)
			)
		}
	}

	updateSlides(direction, lastVisible) {
		const hideCurrentObjects = this.state.slides.slice(0).map((item, i) => {
			return {
				...item,
				containerVisible: i === lastVisible,
				childrenVisible: false
			}
		})
		const hideCurrentContainer = this.state.slides.slice(0).map((item, i) => {
			return {
				...item,
				containerVisible: false,
				childrenVisible: false
			}
		})

		const showNextContainer = this.state.slides.slice(0).map((item, i) => {
			return {
				...item,
				containerVisible: i === this.state.activeSlideIndex,
				childrenVisible: false
			}
		})

		const showNextObjects = this.state.slides.slice(0).map((item, i) => {
			return {
				...item,
				containerVisible: i === this.state.activeSlideIndex,
				childrenVisible: i === this.state.activeSlideIndex
			}
		})

		this.setState({ slides: hideCurrentObjects }, () => {
			this.setState({ slides: hideCurrentContainer }, () => {
				setTimeout(() => {
					this.setState({ slides: showNextContainer }, () => {
						this.setState({ slides: showNextObjects })
					})
				}, this.inbetweenSlides)
			})
		})
	}

	getBtnCss() {
		return this.state.isAnimating ? 'buttonStyle2 button2 disabled2' : 'buttonStyle2 button2'
	}

	getPointerEvents() {
		return this.state.isAnimating ? 'none' : 'auto'
	}

	renderButtons() {
		return (
			<div className="buttonWrapper" style={{ pointerEvents: this.getPointerEvents() }}>
				<div className={this.getBtnCss()} onClick={this.previousSlide}>
					PREVIOUS
				</div>
				<div className={this.getBtnCss()} onClick={this.nextSlide}>
					NEXT
				</div>
			</div>
		)
	}

	render() {
		return (
			<div>
				<div>{this.renderButtons()}</div>
				{this.state.slides.map((Slide, i) => {
					return (
						<div
							key={i}
							style={{
								position: 'absolute',
								left: 0,
								top: 50,
								width: '100%',
								display: 'flex',
								justifyContent: 'center'
							}}>
							<TransitionGroupPlus>
								{Metro.bindContainer(
									this.state.slides[i].containerVisible,
									<div>
										<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<h3 style={{ maxWidth: 300, textAlign: 'center', fontSize: 18 }}>
												{this.state.slides[i].containerVisible ? this.state.slides[i].text : ''}
											</h3>
										</div>
										<Slide.component showContent={this.state.slides[i].childrenVisible} />
									</div>,
									Slide.animation,
									{
										onUnmount: () => {
											this.setState({ isAnimating: false })
										}
									}
								)}
							</TransitionGroupPlus>
						</div>
					)
				})}
			</div>
		)
	}
}

//styles
// http://www.giphy.com/gifs/3ohhwN3ac2p1ixZGYE

const slideContainerAAnim = {
	animation: {
		out: {
			time: 1.3,
			delay: 0
		},
		in: {
			time: 1.5,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, x: 200, y: 0 },
			to: { opacity: 1, x: 0, y: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				x: 0
			},
			to: {
				opacity: 0,
				x: -200,
				ease: 'easeInOutQuint'
			}
		}
	}
}

const slideContainerBAnim = {
	animation: {
		out: {
			time: 1.3,
			delay: 0
		},
		in: {
			time: 1.5,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, x: 200, y: 0 },
			to: { opacity: 1, x: 0, y: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				x: 0
			},
			to: {
				opacity: 0,
				x: -200,
				ease: 'easeInOutQuint'
			}
		}
	}
}

const slideContainerCAnim = {
	animation: {
		out: {
			time: 1.3,
			delay: 0
		},
		in: {
			time: 1.5,
			delay: 0
		},
		willEnter: {
			from: { opacity: 0, y: 200 },
			to: { opacity: 1, y: 0, ease: 'easeOutQuint' }
		},
		willLeave: {
			from: {
				opacity: 1,
				y: 0
			},
			to: {
				opacity: 0,
				y: -200,
				ease: 'easeInOutQuint'
			}
		}
	}
}

export default Scene
