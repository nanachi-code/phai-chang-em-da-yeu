import { Component, Layer, parseOsuTimestamp, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { join } from 'path'
import { path } from '../osbjs.config.js'

export class Vig extends Component {
	constructor() {
		super()
        this.vigFilename = 'sb/vig.png'
		this.vigPath = join(path, this.vigFilename)
	}

	generate() {
		const startTime = 0, endTime = parseOsuTimestamp('03:09:980')
		const vigHeight = imageSize(this.vigPath).height
		const vig = new Sprite(this.vigFilename, Layer.Background)
		vig.ScaleAtTime(startTime, 480 / vigHeight)
		vig.Fade(startTime, endTime + 300, 1, 1)
		this.registerComponents(vig)
	}
}
