kaboom({
  global: true,
  fullscreen: true,
  scale: 0.7,
  debug: true,
  clearColor: [0,0,0,0.8]
})



loadRoot('https://i.imgur.com/'),
loadSprite('guy-left', '1Xq9biB.png'),
loadSprite('guy-right', 'yZIb8O2.png'),
loadSprite('guy-down', 'r377FIM.png'),
loadSprite('guy-up', 'UkV0we0.png'),
loadSprite('left-wall', 'rfDoaa1.png'),
loadSprite('right-wall', 'SmHhgUn.png'),
loadSprite('top-wall', 'QA257Bj.png'),
loadSprite('bottom-wall', 'vWJWmvb.png'),
loadSprite('btm-left-cnr', 'awnTfNC.png'),
loadSprite('btm-right-cnr', '84oyTFy.png'),
loadSprite('top-left-cnr', 'xlpUxIm.png'),
loadSprite('top-right-cnr', 'z0OmBd1.png')
loadSprite('top-door', 'U9nre4n.png'),
loadSprite('left-door', 'okdJNls.png'),
loadSprite('fire-can', 'I7xSp7w.png'),
loadSprite('lantern', 'wiSiY09.png'),
loadSprite('slicer', 'c6JFi5Z.png'),
loadSprite('bad-guy', 'Ei1VnX8.png'),
loadSprite('stair', 'VghkL08.png'),
loadSprite('backgnd', 'u4DVsx6.png',),
loadSprite('kaboom', 'o9WizfI.png')

scene('game', (
  {level, score}
  ) => {

    layers(['backgnd', 'obj', 'ui'], 'obj')

    const maps = [
      [ 
'wtt#t^ttttttttttx',
'l               r',
'l   *           r',
'l               r',
'l    *        1 r',
'(     %         r',
'l               r',
'l               #',
'l               r',
'ybbbbbbbbbbbbbbbz',],

      [
'wtt#ttttttttttttx',
'l               r',
'l   *       ?   #',
'l               r',
'l  1            r',
'#     %         r',
'l               r',
'l     *         #',
'l               r',
'ybbbbbbbbbbbbbbbz'
      ],
    ]
    
   const levelConfig = {
     width: 48,
     height: 48,
    'l' : [sprite('left-wall'), solid(), 'wall'],
    'r' : [sprite('right-wall'), solid(), 'wall'],
    't' : [sprite('top-wall'), solid(), 'wall'],
    'b' : [sprite('bottom-wall'), solid(), 'wall'],
    'w' : [sprite('top-left-cnr'), solid(), 'wall'],
    'x' : [sprite('top-right-cnr'), solid(), 'wall'],
    'y' : [sprite('btm-left-cnr'), solid(), 'wall'],
    'z' : [sprite('btm-right-cnr'), solid(), 'wall'],
    '(' : [sprite('left-door')],
    '^' : [sprite('top-door'), 'next-level'],
    '?' : [sprite('stair'), 'next-level'],
    '*' : [sprite('slicer'), 'slicer', 'dangerous',{ dir: -1}],
    '1' : [sprite('bad-guy'), 'dangerous','bad-guy', { dir: -1, timer: 0}],
    '#' : [sprite('lantern'), solid(), 'wall'],
    '%' : [sprite('fire-can'), solid()],

   }

    addLevel(maps[level], levelConfig)
    // add([sprite('backgnd'), layer('backgnd')])
    const scoreLabel = add([
      scale(4),
      text('0'),
      pos(400,500),
      layer('ui'),
      {
        value: score,
      }
    ])
   const player = add([sprite('guy-right'), 
   pos(10, 290),
   {
     dir: vec2(1,0)
   }])

   player.action(() => {
     player.resolve()
   })

   player.overlaps('next-level', () => {
     go('game', {
       level: (level +1) % maps.length,
       score: scoreLabel.value
     })
   })



      function spawnBoom(p){
       const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
       wait(1, () => {
         destroy (obj)
       })
      }
      keyPress('space', () => {
        spawnBoom(player.pos.add(player.dir.scale(48)))
      })

        const moveSpeed = 120
   keyDown('left', () => {
     player.changeSprite('guy-left')
     player.move(-moveSpeed, 0)
     player.dir =vec2(-1, 0)
   })
  

    keyDown('right', () => {
      player.changeSprite('guy-right')
     player.move(moveSpeed, 0)
     player.dir = vec2(1,0)
   })
    keyDown('up', () => {
      player.changeSprite('guy-up')
     player.move(0, -moveSpeed)
     player.dir = vec2(0, -1)
   })
    keyDown('down', () => {
      player.changeSprite('guy-down')
     player.move(0, moveSpeed)
     player.dir = vec2(0,1)
   })
    const slicerSpeed = 120
   action('slicer', (s) => {
      s.move(s.dir * slicerSpeed, 0) 
   })
   collides('dangerous', 'wall', (s) => {
     s.dir = -s.dir
   })
   const badGuySpeed = 200
   action('bad-guy', (s) => {
      s.move(0, s.dir * badGuySpeed)
      s.timer -= dt()
      if(s.timer <=0){
        s.dir = - s.dir
        s.timer = rand(5)
      }
      collides('kaboom', 'bad-guy', (k, s) => {
        camShake(3)
          wait(1, () => {
            destroy(k)
          })
          destroy(s)
          scoreLabel.value++
          scoreLabel.text = scoreLabel.value
      })

   })
   player.overlaps('dangerous', () => {
     go('lose', {score: scoreLabel.value})
   })
   scene('lose', ({ score }) => {
      add([text(score, 32), origin('center'), pos(width() /2, height() /2)])
   })
})
start("game", 
 {level: 0, score: 0 }
)







