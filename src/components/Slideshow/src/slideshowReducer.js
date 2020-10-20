const slideshowReducer = (state, action) => {
	switch(action.type) {
		case 'RESTART':
			return { currSlide: 0}
		case 'PREV':
			return { currSlide: state.currSlide - 1 }
		case 'NEXT':
			return { currSlide: state.currSlide + 1 }
		default:
			throw new Error();
	}
}

export default slideshowReducer;