

### JavaScript

## API

To run the robot we provide an API to make it simple to execute some commands on the robot.

Here we add an example of code to getting started with the robot.
"myRobot" is a global variable on browser that contains a connector with the robot object.
You can directly call methods for myRobot as shown below.
~~~
  myRobot.move(0.5, 0.5, 0.5);
~~~


### Motors interfaces:

| Method | Description | Argument Description | Type | Example |
| :----: | :---------: | :------------------: | :--: | :-----: |
| setV(linearSpeed) | Sets linear speed for drone. | linearSpeed: Linear speed for the body. | Float | myRobot.setV(0.4) |
| setW(angularSpeed) | Sets angular speed for drone. | angularSpeed: Angular speed for the body. | Float | myRobot.setW(0.4) |
| setL(verticalSpeed) | Sets vertical speed for drone. | lateralSpeed: Vertical speed. | Float | myRobot.setL(0.7) |
| move(linearSpeed, angularSpeed,verticalSpeed) | Sets linear, angular and vertical speed for the robot. | linearSpeed: Linear speed. / angularSpeed: Angular speed / verticalSpeed: Vertical speed | Float , Float , Float | myRobot.move(0.7, 0.5, 0.7) |
| getV() | Returns linear speed given or 0 | - | - | myRobot.getV() |
| getW() | Returns angular speed given or 0 | - | - | myRobot.getW() |
| getL() | Returns vertical speed given or 0 | - | - | myRobot.getL() |
| getRotation() | Returns object with the rotation on X, Y, Z axis | - | - | myRobot.getRotation() |
