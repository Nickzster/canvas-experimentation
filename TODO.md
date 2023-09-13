# Entity Component System

This repository is a very simple implementation of an engine utilizing the Entity Component System (ECS) architecture.

## TODO

- [x] Modify ComponentManager to register components and assign ID's instead of adding them manually.
  - Similar to when adding entities -- there's a max limit of entities as well as an array of ID's ready to be allocated.
  - Entity manager should have `register` method where all components can be registered and given unique ID's.
- [x] Optimize collision system speed (since algorithm is O(n^2) )
- [ ] Optimize component lookup via signatures
- [ ] Look into creating a world + scene system
- [ ] Add better collision checks
- [ ] Look into integrating TypeScript
- [x] Build a player controller system
- [ ] Add a `CircleComponent` and `CircleCollisionComponent`.
- [ ] Add an `ImageComponent`, where sprites can be used to draw shapes.
- [ ] Look into physics (either a simple implementation or utilize a library like matter.js)
- [ ] Look into optimizing collision system to update deltas instead of repainting the canvas with `undefined` each paint.
- [ ] Look into rotations (may require quaternions)
- [ ] Multiplayer functionality
  - [ ] `MultiplayerSystem`
  - [ ] `ServerComponent`
  - [ ] `ServerSystem`
  - [ ] Need to build + testing ECS version on NodeJS.
- [ ] In the world system, we are checking for a paddle and a box collision. Perhaps there is a way we can create an inheritance tree regarding collisions or other similar components?
- [ ] Velocity component could use direction randomization when bouncing off a surface.
