function getValueForKey(key, fallback, url)
{
	if(! url)
	{
		url = window.location.href;
	}
	if(! fallback)
	{
		fallback = 0;
	}
	key = key.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
	var value = fallback;
	if(results && results[2])
	{
		value = decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	return value;
}


var sourceDate = new Date();
var sourceYY = sourceDate.getFullYear();
var period = Number(getValueForKey('p', -1));
if(period < 0)
{
	var title  = getValueForKey('x', "New Year's Day " + (sourceYY + 1));
	var targetYY = Math.floor(getValueForKey('YYYY', sourceYY + 1));
	var targetMM = Math.floor(getValueForKey('MM', 1)) - 1; // zero-based month counter
	var targetDD = Math.floor(getValueForKey('DD', 1));
	var targethh = Math.floor(getValueForKey('hh', 0));
	var targetmm = Math.floor(getValueForKey('mm', 0));
	var targetDate = new Date(targetYY, targetMM, targetDD, targethh, targetmm, 0, 0);
}
else
{
	var title  = getValueForKey('x', " ");
	var sourceMM = sourceDate.getMonth();
	var sourceDD = sourceDate.getDate();
	var sourcehh = sourceDate.getHours();
	var sourcemm = sourceDate.getMinutes() + period;
	var targetDate = new Date(sourceYY, sourceMM, sourceDD, sourcehh, sourcemm, 0, 0);
}
var zeroHour = targetDate.getTime();


var x = setInterval(function()
{
	var countdown = zeroHour - new Date().getTime();
	if(countdown < 0)
	{
		countdown -= 1000; // compensate for Math.floor
	}
	var dd = Math.floor( Math.abs(countdown)                          / (24 * 60 * 60 * 1000));
	var hh = Math.floor((Math.abs(countdown) % (24 * 60 * 60 * 1000)) /      (60 * 60 * 1000));
	var mm = Math.floor((Math.abs(countdown) %      (60 * 60 * 1000)) /           (60 * 1000));
	var ss = Math.floor((Math.abs(countdown) %           (60 * 1000)) /                 1000 );
	var countdownString = "";
	var commentString = "&nbsp;";
	if(countdown > 0)
	{
		countdownString += "&minus;";
		if(dd == 0)
		{
			if(hh >= 23)
			{
				commentString = "less than a day";
			}
			else if(hh == 0)
			{
				if(mm >= 50)
				{
					commentString = "less than an hour";
				}
				else if(mm == 0)
				{
					if(ss >50)
					{
						commentString = "less than a minute";
					}
					else if(ss == 10)
					{
						commentString = "ten";
					}
					else if(ss == 9)
					{
						commentString = "nine";
					}
					else if(ss == 8)
					{
						commentString = "eight";
					}
					else if(ss == 7)
					{
						commentString = "seven";
					}
					else if(ss == 6)
					{
						commentString = "six";
					}
					else if(ss == 5)
					{
						commentString = "five";
					}
					else if(ss == 4)
					{
						commentString = "four";
					}
					else if(ss == 3)
					{
						commentString = "three";
					}
					else if(ss == 2)
					{
						commentString = "two";
					}
					else if(ss == 1)
					{
						commentString = "one";
					}
					else if(ss == 0)
					{
						commentString = "ZERO";
					}
				}
			}
		}
	}
	else
	{
		countdownString += "+";
		if(period < 0)
		{
			if(dd == 0)
			{
				commentString = "Happy New Year!";
			}
		}
		else
		{
			if((dd == 0) && (hh == 0) && (mm == 0))
			{
				commentString = "time's up";
			}
		}
	}
	if((dd > 0) || (hh >= 23))
	{
		countdownString += dd + ".";
	}
	countdownString += ("00" + hh).slice(-2) + ":";
	countdownString += ("00" + mm).slice(-2) + ":";
	countdownString += ("00" + ss).slice(-2);
	document.getElementById("title").innerHTML = title;
	document.getElementById("countdown").innerHTML = countdownString;
	document.getElementById("comment").innerHTML = commentString;
}, 1000);

