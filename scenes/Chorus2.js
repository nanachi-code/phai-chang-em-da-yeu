import { degToRad, randInt } from '@osbjs/math'
import { Easing, Layer, Origin, OsbVector2, Scene, Sprite } from '@osbjs/osbjs'
import imageSize from 'image-size'
import { Color } from '../lib/pallete.js'
import { biggerTxtgen } from '../lib/txtgen.js'
import { beat, path } from '../osbjs.config.js'
import { join } from 'path'

export class Chorus2 extends Scene {
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
				time: 121230,
				pos: new OsbVector2(370, 110),
				angle: degToRad(5),
			},
			{
				text: 'chăng',
				time: 121542,
				pos: new OsbVector2(290, 220),
				angle: degToRad(-7),
			},
			{
				text: 'em',
				time: 121855,
				pos: new OsbVector2(360, 320),
				angle: degToRad(10),
			},
			{
				text: 'đã',
				time: 122167,
				pos: new OsbVector2(300, 400),
				angle: 0,
			},
		]

		let endTime = 122480

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
		endTime = 123730

		lyrics = [
			{
				text: 'yêu',
				time: 122480,
				x: 240,
			},
			{
				text: 'ngay',
				time: 123105,
				x: 415,
			},
		]

		let heart = new Sprite('sb/heart.png', Layer.Background)
		heart.ColorAtTime(122480, Color.RedSalsa)
		heart.FadeAtTime(122480, 1)
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
		endTime = 125292

		lyrics = [
			{
				text: 'cái',
				time: 123730,
			},
			{
				text: 'nhìn',
				time: 124042,
			},
			{
				text: 'đầu',
				time: 124355,
			},
			{
				text: 'tiên',
				time: 124667,
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

		transition.FadeAtTime(125292, 1)
		transition.FadeAtTime(125761, 0)
		transition.ColorAtTime(125292, Color.LightPink)
		transition.ScaleVec(125292, 125761, new OsbVector2(0, 120), new OsbVector2(854, 120), Easing.OutExpo)

		this.registerComponents(transition)

		transition = new Sprite('sb/px.png', Layer.Background, Origin.CenterLeft, new OsbVector2(-107, 240))

		transition.FadeAtTime(125761, 1)
		transition.FadeAtTime(126230, 0)
		transition.ColorAtTime(125761, Color.LightPink)
		transition.ScaleVec(125761, 126230, new OsbVector2(854, 120), new OsbVector2(0, 120), Easing.InExpo)

		this.registerComponents(transition)
		// #endregion
	}

	#_line2() {
		// #region p1
		let lyrics = [
			{
				text: 'Phải',
				time: 126230,
				pos: new OsbVector2(200, 110),
				angle: degToRad(-2),
			},
			{
				text: 'chăng',
				time: 126542,
				pos: new OsbVector2(290, 220),
				angle: degToRad(5),
			},
			{
				text: 'em',
				time: 126855,
				pos: new OsbVector2(400, 320),
				angle: degToRad(-10),
			},
			{
				text: 'đã',
				time: 127167,
				pos: new OsbVector2(340, 400),
				angle: degToRad(2),
			},
		]

		let endTime = 127480

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
		endTime = 128730

		lyrics = [
			{
				text: 'say',
				time: 127480,
				x: 240,
			},
			{
				text: 'ngay',
				time: 128105,
				x: 415,
			},
		]

		let butterfly = new Sprite('sb/butterfly.png', Layer.Background)
		butterfly.ColorAtTime(127480, Color.RedSalsa)
		butterfly.FadeAtTime(127480, 1)
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
		endTime = 129355

		lyrics = [
			{
				text: 'lúc',
				time: 128730,
			},
			{
				text: 'thấy',
				time: 129042,
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
		endTime = 131230

		const juky = new Sprite('sb/juky/frame.jpg', Layer.Background)
		const jukyWidth = imageSize(join(path, 'sb/juky/frame.jpg')).width

		juky.ScaleAtTime(129355, 240 / jukyWidth)
		juky.FadeAtTime(129355, 1)
		juky.FadeAtTime(131230, 0)
		juky.MoveXAtTime(129355, 500)
		juky.MoveY(129355, 129355 + beat, 220, 240, Easing.OutCubic)
		juky.Fade(129355, 129355 + beat, 0, 1, Easing.OutCubic)
		juky.RotateAtTime(129355, degToRad(5))
		juky.Fade(130917, endTime, 1, 0, Easing.InCubic)

		this.registerComponents(juky)

		lyrics = [
			{
				text: 'nụ',
				time: 129355,
			},
			{
				text: 'cười',
				time: 129667,
			},
			{
				text: 'ấy',
				time: 130292,
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
			sprite.Fade(130917, endTime, 1, 0, Easing.InCubic)

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
				time: 131230,
				pos: new OsbVector2(370, 90),
				angle: degToRad(8),
			},
			{
				text: 'yêu',
				time: 131542,
				pos: new OsbVector2(290, 200),
				angle: degToRad(-5),
			},
			{
				text: 'ta',
				time: 131855,
				pos: new OsbVector2(370, 270),
				angle: degToRad(3),
			},
			{
				text: 'ngất',
				time: 132167,
				pos: new OsbVector2(260, 400),
				angle: degToRad(-6),
			},
		]

		let endTime = 132480

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
		endTime = 133730

		lyrics = [
			{
				text: 'ngây',
				time: 132480,
				x: 220,
			},
			{
				text: 'xây',
				time: 133105,
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
		bell.ScaleAtTime(132480, 0.25)
		bell.ColorAtTime(132480, Color.RedSalsa)
		bell.FadeAtTime(132480, 1)
		bell.FadeAtTime(endTime, 0)
		bell.Rotate(132480, 132792, degToRad(20), degToRad(-20), Easing.OutCirc)
		bell.Rotate(132792, 133105, degToRad(-20), degToRad(20), Easing.OutCirc)
		bell.Rotate(133105, 133417, degToRad(20), degToRad(-20), Easing.OutCirc)
		bell.Rotate(133417, 133730, degToRad(-20), degToRad(20), Easing.OutCirc)

		this.registerComponents(bell)
		// #endregion

		// #region p3
		endTime = 135605

		lyrics = [
			{
				text: 'chín',
				time: 133730,
			},
			{
				text: 'tầng',
				time: 134042,
			},
			{
				text: 'trời',
				time: 134355,
			},
			{
				text: 'mây',
				time: 134667,
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
				time: 135605,
				y: 80,
			},
			{
				text: 'xa',
				time: 136073,
				y: 160,
			},
			{
				text: 'mờ',
				time: 136542,
				y: 240,
			},
		]

		endTime = 137480

		const tempBg = new Sprite('sb/px.png', Layer.Background)
		tempBg.ColorAtTime(137167, Color.Black)
		tempBg.ScaleVecAtTime(137167, new OsbVector2(854, 480))
		tempBg.FadeAtTime(137167, 1)
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
			sprite.ColorAtTime(137167, Color.White)

			this.registerComponents(sprite)
		})

		// #endregion
	}

	#_line4() {
		let endTime = 142480

		let lyrics = [
			{
				text: 'Ánh',
				time: 137480,
				pos: new OsbVector2(-90, 240),
				angle: degToRad(-30),
			},
			{
				text: 'lên',
				time: 137792,
				pos: new OsbVector2(30, 180),
				angle: degToRad(-5),
			},
			{
				text: 'từng',
				time: 138105,
				pos: new OsbVector2(120, 190),
				angle: degToRad(10),
			},
			{
				text: 'giấc',
				time: 138417,
				pos: new OsbVector2(245, 220),
				angle: degToRad(25),
			},
			{
				text: 'mơ',
				time: 138730,
				pos: new OsbVector2(355, 280),
				angle: degToRad(15),
			},
			{
				text: 'ngày',
				time: 139042,
				pos: new OsbVector2(435, 320),
				angle: degToRad(0),
			},
			{
				text: 'có',
				time: 139355,
				pos: new OsbVector2(575, 300),
				angle: degToRad(-10),
			},
			{
				text: 'anh',
				time: 140292,
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
		const startTime = 122480,
			endTime = 142480

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.FadeAtTime(startTime, 1)
		bg.FadeAtTime(endTime, 0)
		bg.ColorAtTime(startTime, Color.TeaGreen)

		this.registerComponents(bg)
	}

	#_endSceneTransition() {
		const startTime = 141855

		const bg = new Sprite('sb/px.png', Layer.Background)

		bg.ScaleVecAtTime(startTime, new OsbVector2(854, 480))
		bg.Fade(startTime, startTime + beat, 0, 1)

		this.registerComponents(bg)
	}
}
