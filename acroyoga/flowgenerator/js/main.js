"use strict";

$(document).ready(main);

function main() {
	var state = new State();
	state.Init();
	state.NextPose();

	$(window).keypress(function(e) {
		if (e.keyCode == 0 || e.keyCode == 32) {
			state.NextPose();
		}
	});

	$("#btnSubmit").click(function(){
		state.NextPose();
	}); 

	console.log("name, altnames, level, transitions, picture")
	g_poses.forEach(function(i) {
		console.log(i.name + " - " + i.altnames + " - " + i.level + " - " + i.transitions + " - " + i.picture);
	});
}

function State() {
	var currentPose;
	var flow;
};
State.prototype.Init = function () {
	this.currentPose = 0;
	this.flow = [];
}
/*State.prototype.ConstructFlow = function () {
	var tmpflow = [];
	var transitionkeys = Object.keys(g_poses);
	for(var i = 0; i < 10; ++i) {
		var pose = g_poses[transitionkeys[transitionkeys.length * Math.random() << 0]];

		tmpflow.push(pose);
		transitionkeys = Object.keys(pose.transitions);
	}

	this.flow = tmpflow;

	this.currentPose = 0
	$("#currentpose").text(this.flow[0].name);
	$("#currentposeimg").attr('src', this.flow[0].picture);
}*/

State.prototype.NextPose = function() {

	/*if(this.currentPose == 0) {
		transitionkeys = Object.keys(g_poses);
	}
	else {
		transitionkeys = Object.keys(this.flow[this.flow.length - 1].transitions);
	}*/

	var validposes = g_poses.slice();
	for (var i = this.flow.length, k = 0; i--; k++) {
		if(k >= 5) { // Only go back the last 5. We do it like this so that if there's less than 5 in the flow shit doesn't break
			break;
		}

		for (var j = validposes.length; j--; ) {
			if(this.flow[i].name === validposes[j].name) {
				validposes.splice(j, 1);
			}
		}
	}

	var transitionkeys = Object.keys(validposes);

	var minlevel = $('#minlevel').find(":selected").val();
	var maxlevel = $('#maxlevel').find(":selected").val();
	for(var i = 0; i < 500; ++i) { // Hack
		var pose = validposes[transitionkeys[transitionkeys.length * Math.random() << 0]];
		if(minlevel > maxlevel)
			break; // Hack

		if(pose.level >= minlevel && pose.level <= maxlevel) {
			break;
		}
	}

	$("#currentpose").text(pose.name);
	$("#currentposelevel").text("Level " + pose.level);
	$("#currentposeimg").attr('src', pose.picture);
	this.flow.push(pose);

	//++this.currentPose;

	var str = pose.name;
	/*this.flow.forEach(function(i) {
		str += i.name + " - ";
	});*/
	console.log(str);
};

var Pose = function(name, altnames, level, transitions, picture) {
  this.name = name;
  this.altnames = altnames;
  this.level = level;
  this.transitions = transitions;
  this.picture = picture;
};

var g_poses = [
	new Pose('Bird', ['Front Bird', 'Front Plank'], 1, ['Folded Leaf', 'Super Yogi', 'Straddle Throne', 'Bow', 'Reverse Prayer'], 'http://ih.constantcontact.com/fs122/1102664683001/img/207.jpg'),
	new Pose('Folded Leaf', [], 1, ['Bird', 'Super Yogi', 'Reverse Prayer'], 'http://www.sonnennest.at/wp-content/uploads/2010/08/Folded_Leaf.jpg'),
	new Pose('Super Yogi', [], 1, ['Bird', 'Folded Leaf', 'Reverse Prayer'], 'http://acropedia.org/wp-content/uploads/2014/01/Super-Yogi.jpg'),
	new Pose('Straddle Throne', ['Throne'], 1, ['Bird', 'Mermaid'], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/Throne.jpg'),
	new Pose('Reverse Straddle Throne', ['Reverse Throne'], 1, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-throne.jpg?resize=600%2C400'),
	new Pose('Throne', ['Easy Throne'], 1, ['Straddle Throne', 'Whale'], 'http://beckerle.de/wp-content/uploads/2013/05/throne.jpg'),
	new Pose('Whale', ['High Flying Whale'], 1, ['Throne'], 'http://flying-yogis.de/pics/gallery/acroyogahighflyingwhale1.jpg'),
	new Pose('Bat', ['Straddle Bat'], 1, ['Folded Leaf'], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/02/Straddle-bat-fisheye-5975.jpg'),
	new Pose('Bow', [], 1, ['Bird'], 'http://www.omshanti.cat/images/galeries/acroyoga/Yoga%20in%20Moscow%20(227).jpg'),
	new Pose('Mermaid', [], 1, ['Straddle Throne'], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/Mermaid-Wari.jpg'),
	new Pose('Reverse Prayer', [], 1, ['Bird', 'Folded Leaf', 'Super Yogi'], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2014/01/Reverse-Prayer2.jpg'),

	new Pose('Back Bird', [], 1, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/06/back-bird2.jpg'),
	new Pose('Back Bow', [], 1, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/02/Backbow.jpg'),
	new Pose('Back Plank', [], 1, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Back-Plank2.jpg'),
	new Pose('Nataraj', [], 1, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/06/nataraj.jpg'),
	new Pose('Scare Crow', [], 1, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/01/Scare-Crow2.jpg'),

	new Pose('Couch', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-Vasi-Tag.jpg'),
	new Pose('Floating Pashi', [], 2, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/07/Floating-Pashi-TAG.jpg'),
	new Pose('Hammock', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/02/Hammock.jpg'),
	new Pose('Heart to Knees', [], 2, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/02/Knees-to-Heart.jpg'),
	new Pose('Leaf Twist', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/02/Leaf-Twist1.jpg'),
	new Pose('Reverse Back Plank', [], 2, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-Back-Plank.jpg'),
	new Pose('Reverse Bat', ['Walnut'], 2, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/08/Walnut1.png'),
	new Pose('Reverse Couch', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/Vishnus-couch-4248.jpg'),
	new Pose('Reverse Tuck Sit', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-Tuck-Sit-Tag.jpg'),
	new Pose('Shoulder Stand', [], 2, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/02/Super-Free-Shoulder-Stand1.jpg'),
	new Pose('Star', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Star.jpg'),
	new Pose('Tittibhasana', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Titti.jpg'),
	new Pose('Tuck Sit', [], 2, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/07/Tuck-Sit-Tag.jpg'),
	new Pose('Vishnu’s Couch', [], 2, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/vasi-acro-2696.jpg'),
	
	new Pose('Bound Twist', [], 3, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/01/Bound-Twist.jpg'),
	new Pose('Croc', [], 3, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/06/croc-legs-together-5890.jpg'),
	new Pose('Foot-to-Foot', [], 3, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/tamar-foot-to-hand.jpg'),
	new Pose('Foot-to-Hand', [], 3, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/kadri-tag.jpg'),
	//new Pose('Forearm Compression', [], 3, [], ''), // Not a single picture of this on the internet (Croc with 2 arms?)
	new Pose('Hangle Dangle', [], 3, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Hangle-Dangle.jpg'),
	new Pose('Little Mermaid', [], 3, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/06/Little-Mermaid.jpg'),
	new Pose('Navasana', [], 3, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/07/navasana.jpg'),
	new Pose('Pasarita Twist', [], 3, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/02/Pasarita-Twist.jpg'),
	new Pose('Reverse Shoulder Stand', [], 3, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/06/DSC00088.jpg'),
	new Pose('Reverse Star', [], 3, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/02/reverse-star.jpg'),
	new Pose('Reverse Tittibhasana', [], 3, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-Titti.jpg'),
	new Pose('Reverse Vishnu’s Couch', [], 3, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2013/07/Reverse-Vishnus-Couch-Tag.jpg'),
	new Pose('Side Star', [], 1, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/06/Rachel-Dragonfly-Side-Star.jpg'),
	new Pose('Whaka Stretch', [], 3, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/02/Whaka-Stretch.jpg'),
	
	new Pose('Butterfly', [], 4, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2013/07/526712_3967752562437_461871322_n.jpg'),
	new Pose('Care Bear Stare', [], 4, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2014/01/Care-Bear-Stare.jpg'),
	new Pose('Cranio-Sacral', [], 4, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/01/CranioSacral.jpg'),
	new Pose('Floating Camel', [], 4, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2013/07/Floating-Camel.jpg'),
	new Pose('Heart to Hands', [], 4, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/01/Heart-to-Hands.jpg'),
	new Pose('Heart to Shin', [], 4, [], 'http://i2.wp.com/acropedia.org/wp-content/uploads/2014/01/Heart-to-Shin.jpg'),
	new Pose('Reverse Table Top', [], 4, [], 'http://i0.wp.com/acropedia.org/wp-content/uploads/2014/02/Reverse-Table-Top.jpg'),

	new Pose('Hand-to-Hand', [], 5, [], 'http://acropedia.org/wp-content/uploads/2013/06/603856_10151621976391101_284726456_n.jpg'),
	new Pose('Super Natural', [], 5, [], 'http://i1.wp.com/acropedia.org/wp-content/uploads/2014/01/Super-Natural.jpg'),
	//new Pose('', [], 1, [], ''),
]