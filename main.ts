namespace SpriteKind { // Creates new kinds of Sprite
    export const Gas = SpriteKind.create()
}

// Controller
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Création Projectiles
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . 7 1 . . . . . . .
        . . . . . . 7 7 1 1 . . . . . .
    `, SpaceShip, 0, -50)
    projectile.startEffect(effects.spray)
})


// Interactions entre les Sprites
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    // SpaceShip avec Refills
    Fuel.value += 100
    otherSprite.destroy()
})

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    // Asteroides avec Projectiles
    Asteroides.destroy(effects.disintegrate, 100)
    projectile.destroy(effects.disintegrate, 100)
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    // SpaceShip avec Asteroides
    info.changeLifeBy(-1)
    otherSprite.destroy()
})

// Is it gameOver ?
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.gameOver(false)
})

// What is that ????
let Refill: Sprite = null
let projectile: Sprite = null
let Asteroides: Sprite = null
let Fuel: StatusBarSprite = null
let SpaceShip: Sprite = null

// BackGround Effect
effects.starField.startScreenEffect(10000000000000000)

// Création SpaceShip
SpaceShip = sprites.create(assets.image`Space ship`, SpriteKind.Player)
controller.moveSprite(SpaceShip)
SpaceShip.setStayInScreen(true)

// Création FuelBar
Fuel = statusbars.create(20, 4, StatusBarKind.Energy)
Fuel.attachToSprite(SpaceShip, -20, 0)

// Ennemies
game.onUpdateInterval(800, function () {
    Asteroides = sprites.createProjectileFromSide(img` 
        . . . . . . c b a c . . . . . . 
        . . . . c c b c f a c . . . . . 
        . . . . a f b b b a c . . . . . 
        . . . . a f f b a f c c . . . . 
        . . . . c b b a f f c . . . . . 
        . . . . . b b a f a . . . . . . 
        . . . . . . c b b . . . . . . . 
        `, 0, 50)
    Asteroides.x = randint(5, 155)
    Asteroides.setKind(SpriteKind.Enemy)
})

// Fuel and Refills
game.onUpdateInterval(300, function () {
    Fuel.value += -1
})

game.onUpdateInterval(5000, function () {
    Refill = sprites.createProjectileFromSide(img` 
        . . . . . 1 1 7 7 . . . . . . . 
        . . . . 1 1 1 7 7 7 . . . . . . 
        . . . . 1 1 7 1 7 7 . . . . . . 
        . . . . 1 1 7 1 7 7 . . . . . . 
        . . . . 1 1 1 7 7 7 . . . . . . 
        . . . . . 1 1 7 7 . . . . . . .  
        `, 0, 50)
    Refill.x = randint(5, 155)
    Refill.setKind(SpriteKind.Gas)
})
