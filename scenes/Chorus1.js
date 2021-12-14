import { degToRad, randInt } from '@osbjs/math'
import { Easing, Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { Color } from '../lib/pallete.js'
import { biggerTxtgen } from '../lib/txtgen.js'
import { beat, path } from '../osbjs.config.js'
import { join } from 'path'

export class Chorus1 extends Scene {
	constructor() {
		super()
	}

	generate() {
		this.#_bg()
		this.#_line1()
		this.#_line2()
		this.#_line3()
		this.#_line4()
		this.#_endSceneTransition()
	}

	#_line1() {
		// #region p1
		let lyrics = [
			{
				text: 'Phải',
				time: 61230,
				pos: new OsbVector2(370, 110),
				angle: degToRad(5),
			},
			{
				text: 'chăng',
				time: 61542,
				pos: new OsbVector2(290, 220),
				angle: degToRad(-7),
			},
			{
				text: 'em',
				time: 61855,
				pos: new OsbVector2(360, 320),
				angle: degToRad(10),
			},
			{
				text: 'đã',
				time: 62167,
				pos: new OsbVector2(300, 400),
				angle: 0,
			},
		]

		let endTime = 62480

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.RotateAtTime(word.time, word.angle)
			sprite.FadeAtTime(endTime, 0)
			sprite.Move(word.time, word.time + beat / 2, new OsbVector2(word.pos.x - 3, word.pos.y - 3), word.pos, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.6)

			this.registerComponents(sprite)
		})

		// #endregion

		// #region p2
		endTime = 63730

		lyrics = [
			{
				text: 'yêu',
				time: 62480,
				x: 240,
			},
			{
				text: 'ngay',
				time: 63105,
				x: 415,
			},
		]

		let heart = new Sprite('sb/heart.png', Layer.Background)
		heart.ColorAtTime(62480, Color.RedSalsa)
		heart.FadeAtTime(62480, 1)
		heart.FadeAtTime(endTime, 0)

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutQuart)
			sprite.FadeAtTime(endTime, 0)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveX(word.time, word.time + beat, 320, word.x, Easing.OutQuart)
			sprite.MoveYAtTime(word.time, 250)

			heart.Scale(word.time, word.time + beat, 0.5, 0.7, Easing.OutElastic)

			this.registerComponents(sprite)
		})

		this.registerComponents(heart)
		// #endregion

		// #region p3
		endTime = 65292

		lyrics = [
			{
				text: 'cái',
				time: 63730,
			},
			{
				text: 'nhìn',
				time: 64042,
			},
			{
				text: 'đầu',
				time: 64355,
			},
			{
				text: 'tiên',
				time: 64667,
			},
		]

		let lineWidth = 0

		// measure
		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			lineWidth += texture.width * 0.45
		})

		let startX = 320 - lineWidth / 2

		lyrics.forEach((word, index) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.CenterLeft)

			sprite.MoveXAtTime(word.time, startX)
			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveY(word.time, word.time + beat / 2, 200, 240, Easing.OutBack)

			let offset = index % 2 == 0 ? -30 : 30
			let endY = 240 + offset
			let angle = index % 2 != 0 ? degToRad(randInt(5, 15)) : degToRad(randInt(-15, -5))
			sprite.MoveY(endTime - beat / 2, endTime, 240, endY, Easing.InCubic)
			sprite.Rotate(endTime - beat / 2, endTime, 0, angle, Easing.InCubic)
			sprite.Fade(endTime - beat / 2, endTime, 1, 0, Easing.InCubic)

			this.registerComponents(sprite)

			startX += texture.width * 0.45
		})
		// #endregion

		// #region transition
		let transition = new Sprite('sb/px.png', Layer.Background, Origin.CenterRight, new OsbVector2(747, 240))

		transition.FadeAtTime(65292, 1)
		transition.FadeAtTime(65761, 0)
		transition.ColorAtTime(65292, Color.LightPink)
		transition.ScaleVec(65292, 65761, new OsbVector2(0, 120), new OsbVector2(854, 120), Easing.OutExpo)

		this.registerComponents(transition)

		transition = new Sprite('sb/px.png', Layer.Background, Origin.CenterLeft, new OsbVector2(-107, 240))

		transition.FadeAtTime(65761, 1)
		transition.FadeAtTime(66230, 0)
		transition.ColorAtTime(65761, Color.LightPink)
		transition.ScaleVec(65761, 66230, new OsbVector2(854, 120), new OsbVector2(0, 120), Easing.InExpo)

		this.registerComponents(transition)
		// #endregion
	}

	#_line2() {
		// #region p1
		let lyrics = [
			{
				text: 'Phải',
				time: 66230,
				pos: new OsbVector2(200, 110),
				angle: degToRad(-2),
			},
			{
				text: 'chăng',
				time: 66542,
				pos: new OsbVector2(290, 220),
				angle: degToRad(5),
			},
			{
				text: 'em',
				time: 66855,
				pos: new OsbVector2(400, 320),
				angle: degToRad(-10),
			},
			{
				text: 'đã',
				time: 67167,
				pos: new OsbVector2(340, 400),
				angle: degToRad(2),
			},
		]

		let endTime = 67480

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.RotateAtTime(word.time, word.angle)
			sprite.FadeAtTime(endTime, 0)
			sprite.Move(word.time, word.time + beat / 2, new OsbVector2(word.pos.x - 3, word.pos.y - 3), word.pos, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.6)

			this.registerComponents(sprite)
		})

		// #endregion

		// #region p2
		endTime = 68730

		lyrics = [
			{
				text: 'say',
				time: 67480,
				x: 240,
			},
			{
				text: 'ngay',
				time: 68105,
				x: 415,
			},
		]

		let butterfly = new Sprite('sb/butterfly.png', Layer.Background)
		butterfly.ColorAtTime(67480, Color.RedSalsa)
		butterfly.FadeAtTime(67480, 1)
		butterfly.FadeAtTime(endTime, 0)

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutQuart)
			sprite.FadeAtTime(endTime, 0)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveX(word.time, word.time + beat, 320, word.x, Easing.OutQuart)
			sprite.MoveYAtTime(word.time, 250)

			let bScale = 0.4
			butterfly.ScaleVec(word.time, word.time + beat / 2, new OsbVector2(bScale, bScale), new OsbVector2(0, bScale), Easing.InCubic)
			butterfly.ScaleVec(word.time + beat / 2, word.time + beat, new OsbVector2(0, bScale), new OsbVector2(bScale, bScale), Easing.OutCubic)

			this.registerComponents(sprite)
		})

		this.registerComponents(butterfly)
		// #endregion

		// #region p3
		endTime = 69355

		lyrics = [
			{
				text: 'lúc',
				time: 68730,
			},
			{
				text: 'thấy',
				time: 69042,
			},
		]

		let lineHeight = 0

		// measure
		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			lineHeight += texture.height * 0.45
		})

		let startY = 240 - lineHeight / 2

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopCenter)

			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveY(word.time, word.time + beat / 2, startY, startY + 30, Easing.OutBack)
			sprite.FadeAtTime(endTime, 0)

			this.registerComponents(sprite)

			startY += texture.width * 0.45
		})
		// #endregion

		// #region p4
		endTime = 71230

		const juky = new Sprite('sb/juky/frame.jpg', Layer.Background)
		const jukyWidth = imageSize(join(path, 'sb/juky/frame.jpg')).width

		juky.ScaleAtTime(69355, 240 / jukyWidth)
		juky.FadeAtTime(69355, 1)
		juky.FadeAtTime(71230, 0)
		juky.MoveXAtTime(69355, 500)
		juky.MoveY(69355, 69355 + beat, 220, 240, Easing.OutCubic)
		juky.Fade(69355, 69355 + beat, 0, 1, Easing.OutCubic)
		juky.RotateAtTime(69355, degToRad(5))
		juky.Fade(70917, endTime, 1, 0, Easing.InCubic)

		this.registerComponents(juky)

		lyrics = [
			{
				text: 'nụ',
				time: 69355,
			},
			{
				text: 'cười',
				time: 69667,
			},
			{
				text: 'ấy',
				time: 70292,
			},
		]

		let startX = 0
		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.CenterLeft)

			sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutExpo)
			sprite.Rotate(word.time, word.time + beat, degToRad(-5), 0)
			sprite.MoveXAtTime(word.time, startX)
			sprite.FadeAtTime(endTime, 0)
			sprite.MoveY(word.time, word.time + beat, 245, 240, Easing.OutCubic)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.Fade(70917, endTime, 1, 0, Easing.InCubic)

			this.registerComponents(sprite)

			startX += texture.width * 0.45
		})

		// #endregion
	}

	#_line3() {
		// #region p1
		let lyrics = [
			{
				text: 'Tình',
				time: 71230,
				pos: new OsbVector2(370, 90),
				angle: degToRad(8),
			},
			{
				text: 'yêu',
				time: 71542,
				pos: new OsbVector2(290, 200),
				angle: degToRad(-5),
			},
			{
				text: 'ta',
				time: 71855,
				pos: new OsbVector2(370, 270),
				angle: degToRad(3),
			},
			{
				text: 'ngất',
				time: 72167,
				pos: new OsbVector2(260, 400),
				angle: degToRad(-6),
			},
		]

		let endTime = 72480

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.RotateAtTime(word.time, word.angle)
			sprite.FadeAtTime(endTime, 0)
			sprite.Move(word.time, word.time + beat / 2, new OsbVector2(word.pos.x - 3, word.pos.y - 3), word.pos, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.6)

			this.registerComponents(sprite)
		})

		// #endregion

		// #region p2
		endTime = 73730

		lyrics = [
			{
				text: 'ngây',
				time: 72480,
				x: 220,
			},
			{
				text: 'xây',
				time: 73105,
				x: 410,
			},
		]

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background)

			sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutQuart)
			sprite.FadeAtTime(endTime, 0)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveX(word.time, word.time + beat, 320, word.x, Easing.OutQuart)
			sprite.MoveYAtTime(word.time, 250)

			this.registerComponents(sprite)
		})

		let bell = new Sprite('sb/bell.png', Layer.Background, Origin.TopCenter, new OsbVector2(320, 210))
		bell.ScaleAtTime(72480, 0.25)
		bell.ColorAtTime(72480, Color.RedSalsa)
		bell.FadeAtTime(72480, 1)
		bell.FadeAtTime(endTime, 0)
		bell.Rotate(72480, 72792, degToRad(20), degToRad(-20), Easing.OutCirc)
		bell.Rotate(72792, 73105, degToRad(-20), degToRad(20), Easing.OutCirc)
		bell.Rotate(73105, 73417, degToRad(20), degToRad(-20), Easing.OutCirc)
		bell.Rotate(73417, 73730, degToRad(-20), degToRad(20), Easing.OutCirc)

		this.registerComponents(bell)
		// #endregion

		// #region p3
		endTime = 75605

		lyrics = [
			{
				text: 'chín',
				time: 73730,
			},
			{
				text: 'tầng',
				time: 74042,
			},
			{
				text: 'trời',
				time: 74355,
			},
			{
				text: 'mây',
				time: 74667,
			},
		]

		let lineWidth = 0

		// measure
		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			lineWidth += texture.width * 0.45
		})

		let startX = 320 - lineWidth / 2
		let scaledStartX = startX
		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.CenterLeft)

			let startTime = word.time
			sprite.MoveXAtTime(word.time, startX)
			sprite.Fade(startTime, startTime + beat / 2, 0, 1, Easing.OutCirc)
			sprite.FadeAtTime(startTime + beat / 2, 0)
			sprite.FadeAtTime(endTime - beat, 1)
			sprite.Fade(endTime - beat, endTime, 1, 0)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveY(endTime - beat, endTime, 240, 230, Easing.OutCirc)
			sprite.MoveX(endTime - beat, endTime, startX, scaledStartX, Easing.OutCirc)
			sprite.Scale(endTime - beat, endTime, 0.45, 0.2, Easing.OutCirc)
			sprite.Rotate(endTime - beat, endTime, 0, degToRad(-15), Easing.OutCirc)

			this.registerComponents(sprite)

			startX += texture.width * 0.45
			scaledStartX += texture.width * 0.2
		})
		// #endregion

		// #region p4
		lyrics = [
			{
				text: 'khuất',
				time: 75605,
				y: 80,
			},
			{
				text: 'xa',
				time: 76073,
				y: 160,
			},
			{
				text: 'mờ',
				time: 76542,
				y: 240,
			},
		]

		endTime = 77480

		const tempBg = new Sprite('sb/px.png', Layer.Background)
		tempBg.ColorAtTime(77167, Color.Black)
		tempBg.ScaleVecAtTime(77167, new OsbVector2(854, 480))
		tempBg.FadeAtTime(77167, 1)
		tempBg.FadeAtTime(endTime, 0)

		this.registerComponents(tempBg)

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.TopCenter)

			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.ColorAtTime(word.time, Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.MoveY(word.time, word.time + beat / 2, word.y, word.y + 30, Easing.OutBack)
			sprite.FadeAtTime(endTime, 0)
			sprite.ColorAtTime(77167, Color.White)

			this.registerComponents(sprite)
		})

		// #endregion
	}

	#_line4() {
		let endTime = 82480

		let lyrics = [
			{
				text: 'Ánh',
				time: 77480,
				pos: new OsbVector2(-90, 240),
				angle: degToRad(-30),
			},
			{
				text: 'lên',
				time: 77792,
				pos: new OsbVector2(30, 180),
				angle: degToRad(-5),
			},
			{
				text: 'từng',
				time: 78105,
				pos: new OsbVector2(120, 190),
				angle: degToRad(10),
			},
			{
				text: 'giấc',
				time: 78417,
				pos: new OsbVector2(245, 220),
				angle: degToRad(25),
			},
			{
				text: 'mơ',
				time: 78730,
				pos: new OsbVector2(355, 280),
				angle: degToRad(15),
			},
			{
				text: 'ngày',
				time: 79042,
				pos: new OsbVector2(435, 320),
				angle: degToRad(0),
			},
			{
				text: 'có',
				time: 79355,
				pos: new OsbVector2(575, 300),
				angle: degToRad(-10),
			},
			{
				text: 'anh',
				time: 80292,
				pos: new OsbVector2(640, 280),
				angle: degToRad(-20),
				hasHeart: true,
				heartPos: new OsbVector2(620, 295),
			},
		]

		lyrics.forEach((word) => {
			const texture = biggerTxtgen.generateTexture(word.text, Color.White, { left: 20, right: 20 })

			const sprite = new Sprite(texture.osbPath, Layer.Background, Origin.CenterLeft, word.pos)
			if (word.hasHeart) {
				sprite.Fade(word.time, word.time + beat, 0, 1, Easing.OutCubic)
			} else {
				sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			}
			sprite.Fade(word.time, word.time + beat / 2, 0, 1, Easing.OutExpo)
			sprite.FadeAtTime(endTime, 0)
			sprite.ColorAtTime(word.time, word.hasHeart ? Color.White : Color.Amethyst)
			sprite.ScaleAtTime(word.time, 0.45)
			sprite.RotateAtTime(word.time, word.angle)
			sprite.MoveX(word.time, word.time + beat * 8, word.pos.x, word.pos.x - 300)

			if (word.hasHeart) {
				const heart = new Sprite('sb/heart.png', Layer.Background, Origin.CenterLeft, word.heartPos)
				heart.ColorAtTime(word.time, Color.RedSalsa)
				heart.Fade(word.time, word.time + beat, 0, 1, Easing.OutCubic)
				heart.RotateAtTime(word.time, word.angle)
				heart.FadeAtTime(endTime, 0)
				heart.ScaleAtTime(word.time, 2.2)
				heart.MoveX(word.time, word.time + beat * 8, word.heartPos.x, word.heartPos.x - 300)

				this.registerComponents(heart)
			}

			this.registerComponents(sprite)
		})
	}

	#_bg() {
		const startTime = 62480,
			endTime = 82480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(endTime, 0)
		bg.ColorAtTime(startTime, Color.TeaGreen)

		this.registerComponents(bg)
	}

	#_endSceneTransition() {
		const angle = 10,
			thickness = 40,
			color = Color.LightPink

		const startTime = 81855

		let actualLength = 854 + 480 * Math.tan(degToRad(Math.abs(angle)))
		let spriteLength = Math.sqrt(Math.pow(854, 2) + Math.pow(480, 2)) + thickness * Math.tan(degToRad(Math.abs(angle)))

		let openOrigin = Origin.TopLeft
		let openX = -107
		let openY = 0 - thickness * Math.sin(degToRad(angle))

		for (let i = 0; i <= actualLength / (thickness / Math.cos(degToRad(angle))); i++) {
			const openSprite = new Sprite('sb/px.png', Layer.Background, openOrigin, new OsbVector2(openX, openY))
			openSprite.ColorAtTime(startTime, color)
			openSprite.RotateAtTime(startTime, degToRad(angle))
			openSprite.ScaleVec(startTime, startTime + beat, new OsbVector2(0, spriteLength), new OsbVector2(thickness, spriteLength), Easing.OutExpo)
			openSprite.FadeAtTime(startTime, 1)
			openSprite.FadeAtTime(startTime + beat, 0)

			openX += thickness / Math.cos(degToRad(angle))

			this.registerComponents(openSprite)
		}
	}
}
