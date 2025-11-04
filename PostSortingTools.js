//Assisting functions 
async function arrayReverser(array){
	let output = []
	for(var i= array.length ;i>0;i--){
		output.push(array[i])
	}
}

function objectReplacer(input,array,index,steps,forward){
	let output;
	if(forward == true){
		//remove object first
		array.splice(index,1)
		//place object at new index
		array.splice((index+steps),0,input)
		output = array
	}else{
		array.splice(index,1)
		array.splice((index-steps),0,input)
		output = array
	}
	return output
}

function totalPostPlays(basicDetails){
	let output = 0
	let views = basicDetails.views 
	for(var i=0; i<views.length; i++){
		let view = views[i]
		output = output+view.plays
	}
	return output
}

function totalPostOpens(basicDetails){
	let output = 0
	let views = basicDetails.views 
	for(var i=0; i<views.length; i++){
		let view = views[i]
		output = output+view.opens
	}
	return output
}

async function PostSorter(array,highest,index){
	let output = []
	if(index == 0){
		
	}
	if(index == 1){
		
	}
	if(index == 2){
		var highest = []
		for(var i=0; i<array.length; i++){
			let basicDetails = array[i].basicDetails
			let views = basicDetails.views.length 
			if(highest.length == 0){
				highest.push(views)
			}else{
				for(var x=0; x<.highest.length; x++){
					
					let target = highest[x]
					if(target > views){
						highest = objectReplacer(
							views,
							highest,
							x,
							1,
							true
						)
					}
					if(target < views){
						highest = objectReplacer(
							views,
							highest,
							x,
							1,
							false
						)
					}
					
				}
			}
		}
		
		//Process the output 
		for(var i=0; i<highest.length; i++){

			let level = highest[i]
			
			for(var x=0; x<array.length; x++){				
				let post = array[i]
				let basicDetails = post.basicDetails
				let views = basicDetails.views.length 
				if(level == views){
					output.push(post)
				}
			}
			
		}
	}
	if(index == 3){
		var highest = []
		for(var i=0; i<array.length; i++){
			let basicDetails = array[i].basicDetails
			let plays = totalPostPlays(basicDetails)
			if(highest.length == 0){
				highest.push(plays)
			}else{
				for(var x=0; x<.highest.length; x++){
					
					let target = highest[x]
					if(target > plays){
						highest = objectReplacer(
							plays,
							highest,
							x,
							1,
							true
						)
					}
					if(target < plays){
						highest = objectReplacer(
							plays,
							highest,
							x,
							1,
							false
						)
					}
					
				}
			}
		}
		
		//Process the output 
		for(var i=0; i<highest.length; i++){

			let level = highest[i]
			
			for(var x=0; x<array.length; x++){				
				let post = array[i]
				let basicDetails = post.basicDetails
				let plays = totalPostPlays(basicDetails) 
				if(level == plays){
					output.push(post)
				}
			}
			
		}
		
	}
	if(index == 4){
		var highest = []
		for(var i=0; i<array.length; i++){
			let basicDetails = array[i].basicDetails
			let opens = totalPostOpens(basicDetails)
			if(highest.length == 0){
				highest.push(opens)
			}else{
				for(var x=0; x<.highest.length; x++){
					
					let target = highest[x]
					if(target > opens){
						highest = objectReplacer(
							opens,
							highest,
							x,
							1,
							true
						)
					}
					if(target < opens){
						highest = objectReplacer(
							opens,
							highest,
							x,
							1,
							false
						)
					}
					
				}
			}
		}
		
		//Process the output 
		for(var i=0; i<highest.length; i++){

			let level = highest[i]
			
			for(var x=0; x<array.length; x++){				
				let post = array[i]
				let basicDetails = post.basicDetails
				let opens = totalPostOpens(basicDetails) 
				if(level == opens){
					output.push(post)
				}
			}
			
		}
	}
	if(index == 5){
		var highest = []
		for(var i=0; i<array.length; i++){
			let basicDetails = array[i].basicDetails
			let shares = basicDetails.shares.length 
			if(highest.length == 0){
				highest.push(shares)
			}else{
				for(var x=0; x<.highest.length; x++){
					
					let target = highest[x]
					if(target > shares){
						highest = objectReplacer(
							shares,
							highest,
							x,
							1,
							true
						)
					}
					if(target < shares){
						highest = objectReplacer(
							shares,
							highest,
							x,
							1,
							false
						)
					}
					
				}
			}
		}
		
		//Process the output 
		for(var i=0; i<highest.length; i++){

			let level = highest[i]
			
			for(var x=0; x<array.length; x++){				
				let post = array[i]
				let basicDetails = post.basicDetails
				let shares = basicDetails.shares.length 
				if(level == shares){
					output.push(post)
				}
			}
			
		}
	}
	return output
}


let primeUsers = []
let videoCategories = []

async function getVideosOfInterest(userId){
	let output = []
	try{
		let getVideos = await mongoClient.db("YEMPData").collection("MainData").findOne({"name":"videos"})
		let videos = getVideos.body 
		let getUsers = await mongoClient.db("YEMPData").collection("MainData").findOne({"name":"user-profiles"})
		let users = getUsers.body 
		
		let user = users.find((users)=>{
			return users.userId === userid
		})
		
		let interests = user.interests 
		
		//get users with similar interests 
		let userCollectionOne = {}
		
		for(var i=0; i< interests.length;i++){
			//create interest groups
			userCollectionOne[interests[i]]=[]
		}
		
		//organise users into the interest groups 
		
		for(var i=0; i<interests.length; i++){
			
			let interest = interests[i]
			let getUsersByInt = await getUsersByInterest(users,interests)
			let group = userCollectionOne[interest]
			for(var x=0; x<getUsersByInt.length;x++){
				let userx = getUsersByInt[x]
				let search = group.find((group)=>{
					return group.userId === userx.userId
				})
				if(!search){
					if(group.length < 30){
						if(assessUser(userx)== true){
							group.push(userx)
						}
					}
				}
			}
			userCollectionOne[interest] = group
			
		}
		
		//organise users into one group
		
		let keysOne = userCollectionOne.keys
		
		for(var i=0; i<keysOne.length; i++){
			let key = keysOne[i]
			let collection = userCollectionOne[key]
			for(var x=0; x<collection.length; x++){
				let userx = collection[x]
				let search = userCollectionTwo.find((userCollectionTwo)=>{
					return primeUsers.userId === userx.userId
				})
				if(!search){
					primeUsers.push(userx)
				}
			}
		}
		
		//find the categories of videos which collected users are watching 
		for(var i=0; i<primeUsers.length; i++){
			let userx = primeUsers[x]
			let userIdx = userx.userId 
			let checkVideos = await checkVideoCategories(videos,userIdx)
			for(var x=0; x<checkVideos.length; x++){
				let category = checkVideos[x]
				let search = videoCategories.find((videoCategories)=>{
					return videoCategories.category == category
				})
				if(search){
					search.hits = search.hits + 1
				}else{
					videoCategories.push({
						"category":category,
						"hit":1
					})
				}
			}
		}
		
		//sort video categories by hits from highest to lowest 
		let highestHits = []
		for(var i=0; i<videoCategories.length;i++){
			let x = videoCategories[i].hits 
			if(highestHits.length == 0){
				highestHits.push(x)
			}else{
				for(var y=0; y<highestHits.length; y++){
					let hit = highestHits[i]
					if(x > hit && highestHits.includes(hit) == false){
						highestHits.splice(y,0,x)
					}
				}
			}
		}
		
		let videosByHits = []
		for(var i=0; i<highestHits.length;i++){
			let hit = highestHits[i]
			for(var x=0; x<videoCategories.length;x++){
				let cat = videoCategories[x]
				if(cat.hits == hit){
					videoByHits.push(cat)
				}
			}
		}
		//get proportions of videos for every category by hits 
		let hitsTotal = 0
		
		for(var i=0; i<highestHits.length;i++){
			hitsTotal = hitsTotal+highestHits[i]
		}
		for(var i=0; i<videoByHits.length;i++){
			let h = videoByHits[i].hits 
			let proportion = (h/hitsTotal)
			videoByHits[i].proportion = proportion
		}
		
		//get the number of videos required per category 
		for(var i=0; i<videoByHits.length;i++){
			let x = videoByHits[x].proportion
			let num = Math.floor((x * 100))
			videoByHits.vidNum = num
		}
		
		//get all videos from the categories gathered 
		let videosSelected = []
		for(var i=0 ; i<videos.length; i++){
			let video = videos[i]
			let category = video.category
			let search = videoByHits.find((videoByHits)=>{
				return videoByHits.category === category
			})
			if(search){
				videosSelected.push(video)
			}
		}
		
		//sort these videos by views 
		
		let sortedVideosSelected = await PostSorter(videosSelected,true,2)
		
		//load videos into output according to video proportions
		
		for(var i=0; i<videoByHits.length; i++){
			let data = videoByHits[i]
			let num = data.vidNum 
			for(var x=0; x<sortedVideosSelected.length;x++){
				let video = sortedVideosSelected[x]
				if(video.category === data.category && num > 0){
					output.push(video)
					videoByHits[i].vidNum = videoByHits[i].vidNum - 1
				}
			}
		}
		
	}catch{
		
	}
	return output
}
