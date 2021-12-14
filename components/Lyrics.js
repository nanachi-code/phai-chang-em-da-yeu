import { degToRad } from '@osbjs/math'
import { Component, Easing, Layer, Origin, OsbColor, OsbVector2, parseOsuTimestamp, Sprite } from '@osbjs/osbjs'
import { TextureGenerator } from '@osbjs/txtgen'
import lyrics from '../lyrics.js'

export class Lyrics extends Component {
	constructor(folderPath) {
		super()

		this.folderPath = folderPath
		this._textureGenerator = new TextureGenerator(folderPath, 'sb/lyrics', { fontName: 'NotoSerif', fontSize: 56 })
		this._textureGenerator.registerFont('./NotoSerif.otf', 'NotoSerif')
	}

	generate() {
		const scale = 0.4

		for (let i = 0; i < lyrics.length; i++) {
			const line = lyrics[i]
			const startTime = parseOsuTimestamp(line.startTime),
				endTime = parseOsuTimestamp(line.endTime)

			let letterY = 240
			let lineWidth = 0,
				lineHeight = 0

			for (let i = 0; i < line.text.length; i++) {
				const letter = line.text[i]
				let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))
				lineWidth += texture.width * scale
				lineHeight = Math.max(lineHeight, texture.height * scale)
			}

			let letterX = 320 - lineWidth / 2

			for (let i = 0; i < line.text.length; i++) {
				const letter = line.text[i]
				let texture = this._textureGenerator.generateTexture(letter, new OsbColor(255, 255, 255))

				let letterPosition = new OsbVector2(letterX, letterY),
					shadePosition = new OsbVector2(letterX + 1, letterY + 1)

				let sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, letterPosition)

				sprite.ScaleAtTime(startTime, scale)
				sprite.Fade(startTime, startTime + 200, 0, 1)
				sprite.Fade(endTime - 200, endTime, 1, 0)
				sprite.MoveX(startTime, startTime + 800, letterX + 15, letterX + 5, Easing.OutExpo)
				sprite.MoveX(startTime + 800, endTime - 800, letterX + 5, letterX)
				sprite.MoveX(endTime - 800, endTime, letterX, letterX - 10, Easing.InExpo)
				sprite.MoveY(startTime, startTime + 800, letterY + 10, letterY, Easing.OutExpo)
				sprite.MoveY(endTime - 800, endTime, letterY, letterY - 10, Easing.InExpo)
				sprite.Rotate(startTime, startTime + 200, degToRad(5), 0)

				let shade = new Sprite(texture.osbPath, Layer.Background, Origin.TopLeft, shadePosition)

				shade.ScaleAtTime(startTime, scale)
				shade.Fade(startTime, startTime + 200, 0, 1)
				shade.Fade(endTime - 200, endTime, 1, 0)
				shade.ColorAtTime(startTime, new OsbColor(0, 0, 0))
				shade.MoveX(startTime, startTime + 800, shadePosition.x + 15, shadePosition.x + 5, Easing.OutExpo)
				shade.MoveX(startTime + 800, endTime - 800, shadePosition.x + 5, shadePosition.x)
				shade.MoveX(endTime - 800, endTime, shadePosition.x, shadePosition.x - 10, Easing.InExpo)
				shade.MoveY(startTime, startTime + 800, shadePosition.y + 10, shadePosition.y, Easing.OutExpo)
				shade.MoveY(endTime - 800, endTime, shadePosition.y, shadePosition.y - 10, Easing.InExpo)
				shade.Rotate(startTime, startTime + 200, degToRad(5), 0)

				this.registerComponents(shade, sprite)

				letterX += texture.width * scale
			}
		}
	}
}
