import opt

# 控制你的 1 号机器人
def tank1_update():
    return attack(opt.BALL.x, opt.BALL.y)

# 控制你的 2 号机器人
def tank2_update():
    return attack(opt.BALL.x, opt.BALL.y)

# 控制你的 3 号机器人
def tank3_update():
    return attack(opt.BALL.x, opt.BALL.y)

# 控制你的 4 号机器人
def tank4_update():
    return defence()

# 控制你的 5 号机器人
def tank5_update():
    return defence()

def attack(x, y):
    vs, hs = 0, 0
    angle = opt.TANK.angle_to(opt.BALL.x, opt.BALL.y)
    if angle > 0 and angle <= 90:
        vs, hs = opt.TANK.distance_to(x,y)/10, -angle/100
    elif angle > 90 and angle <= 180:
        vs, hs = -opt.TANK.distance_to(x,y)/10, -angle/100
    elif angle > 180 and angle <= 270:
        vs, hs = -opt.TANK.distance_to(x,y)/10, angle/100
    elif angle > 270 and angle <= 360:
        vs, hs = opt.TANK.distance_to(x,y)/10, angle/100
    if vs > 1:
        vs = 1
    elif vs < -1:
        vs = -1
    if hs > 1:
        hs = 1
    elif hs < -1:
        hs = -1
    if opt.TANK.distance_to(x,y) < 3:
        vs = 1
    return vs, hs

def defence():
    vs, hs = 0, 0
    if opt.BALL.x < -40:
        vs, hs = attack(opt.BALL.x, opt.BALL.y)
    else:
        if opt.TANK.is_point_in_range(-48, 0, 2):
            vs, hs = 0, 0
        else:
            vs, hs = attack(-48, 0)
    return vs, hs
