import { Easing, Layer, Origin, OsbColor, OsbVector2, parseOsuTimestamp, Scene, Sprite } from '@osbjs/osbjs'
import { Color } from '../lib/pallete.js'
import { txtgen } from '../lib/txtgen.js'
import { beat } from '../osbjs.config.js'

const lyrics = [
	{
		start: 1230,
		end: 5605,
		text: 'Phải chăng em đã yêu ngay từ cái nhìn đầu tiên',
	},
	{
		start: 6230,
		end: 10917,
		text: 'Phải chăng em đã say ngay từ lúc thấy nụ cười ấy',
	},
	{
		start: 11230,
		end: 17167,
		text: 'Tình yêu ta ngất ngây, xây được chín tầng trời mây, khuất xa mờ',
	},
	{
		start: 17480,
		end: 21230,
		text: 'Ánh lên từng giấc mơ ngày có anh',
	},
]

export class Intro extends Scene {
	constructor() {
		super()
	}

	generate() {
		const black = new Sprite('sb/px.png', Layer.Background)

		black.ScaleVecAtTime(0, new OsbVector2(854, 480))
		black.ColorAtTime(0, Color.Black)
		black.Color(19980, 21230, Color.Black, Color.White)
		black.FadeAtTime(0, 1)
		black.FadeAtTime(22480, 0)

		this.registerComponents(black)

		const scale = 0.6

		for (let i = 0; i < lyrics.length; i++) {
			const line = lyrics[i]
			const startTime = line.start,
				endTime = line.end

			let textY = 240,
				textX = 320

			let texture = txtgen.generateTexture(line.text, Color.White, { left: 10, right: 10 })

			let letterPosition = new OsbVector2(textX, textY)

			let sprite = new Sprite(texture.osbPath, Layer.Background, Origin.Center, letterPosition)

			sprite.ScaleAtTime(startTime, scale)
			sprite.Fade(startTime, startTime + beat / 2, 0, 1)
			sprite.Fade(endTime - beat / 2, endTime, 1, 0)
			sprite.MoveX(startTime, startTime + beat, textX + 10, textX, Easing.OutExpo)
			sprite.MoveX(endTime - beat, endTime, textX, textX - 10, Easing.InExpo)
			sprite.MoveY(startTime, startTime + beat, textY + 10, textY, Easing.OutExpo)
			sprite.MoveY(endTime - beat, endTime, textY, textY - 10, Easing.InExpo)
			if (i == lyrics.length - 1) {
				sprite.Color(19980, 21230, Color.White, Color.Black)
			}
			this.registerComponents(sprite)
		}
	}
}
