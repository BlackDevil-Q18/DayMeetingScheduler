var DaySchedulerView = (function(){
	var noHrs=12,//working day
		startTime=9;//24hr format
	var dayTime = ['AM','PM'];
	
	function drawMin(){
		return "<div class='scheduler-min'></div>";
	}
	
	function drawTimeTick(val){
		return "<span class='timetick'>"+val+"</span>";
	}
	
	function getTimeTick(val){
		var hrTime = val/12;
		if(hrTime==1){
			hrTime = "12:00";
		}else if(hrTime<1){
			hrTime = val%12 + ":00"+dayTime[0];
		}else{
			hrTime = val%12 + ":00"+dayTime[1];
		}
		return hrTime;
	}
	
	function drawDayGrid(){
		var hrTemplate = "<div class='scheduler-hr'>\
								<hr class='scheduler-quater scheduler-quater-1-hr'>\
								<hr class='scheduler-half-hr'>\
								<hr class='scheduler-quater scheduler-quater-2-hr'>\
						 </div>";
		var dayGrid = "";

		for(var i=0;i<noHrs;i++){
			dayGrid = dayGrid + drawTimeTick(getTimeTick(i+startTime)) + hrTemplate;
		}
		dayGrid += drawTimeTick(getTimeTick(noHrs+startTime)); 
		return dayGrid;
	};
	
	function filterMeetingList(ml){
		return ml.filter(function(_meeting){
			return _meeting.start>0 && _meeting.start<720;	
		})
	}
	
	
	var dayScheduler = function(UIcont,meetingList){
							if(UIcont){
								this._cont = UIcont;
								this._meetingList = filterMeetingList(meetingList);
							}
						};
						
	dayScheduler.prototype = {
								drawGrid:function(){
									this._cont.innerHTML = drawDayGrid();
								},
								drawMeeting:function(){
									var that = this;
									MeetingScheduler(this._meetingList).forEach(function(_meeting){
										var meetingDiv = document.createElement("div"); 
											meetingDiv.style.top = _meeting.start*MINUTE_PIX;
											meetingDiv.style.height = _meeting.height;
											meetingDiv.style.left = _meeting.left;
											meetingDiv.style.width = _meeting.width;
											meetingDiv.className += "schedule-meeting";
											meetingDiv.innerText = _meeting.id + " " +(_meeting.name?_meeting.name:"");
											
										that._cont.appendChild(meetingDiv);
									});
								},
								render:function(){
									this.drawGrid();
									this.drawMeeting();
								}
								
							 };
	return dayScheduler;
})();