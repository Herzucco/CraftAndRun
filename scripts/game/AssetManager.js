define( function()
{
	var AssetManager = function AssetManager( path )
	{
		AssetManager.instance = this;
			
		this.path   = path;
		
		this.cachedImages   = new Array();
		this.cachedSounds   = new Array();
		this.cachedTextures = new Array(); //for webGL textures;
		this.cachedTextures.size = 0; //not exactly an array more like an object with texture properties 
		
		this.totalImages  = 0;
		this.loadedImages = 0;
		
		this.totalSounds  = 0;
		this.loadedSounds = 0;
		
		this.loadCircle = 0;
		
		this.frameCount   = 30;
		this.currentFrame = 0;
		
		this.isUpdateAudio = false;
		this.isSkipImages  = false;
		
		this.imageDirectories = [];

		this.imagesLevel1 = [
				{name : "level1/", files : ["tiles.png","platform.png"]},
		]

		this.soundDirectories = [ 
						{ name : "", files : ["ingame.mp3","editor.mp3"] }
			];


		this.parentImagesDirectories = [
							{'images': this.imageDirectories, 'sounds' : this.soundDirectories},
							{'images' : [] , 'sounds' : []},
							{'images' : [], 'sounds' : [] }
		  ];
	
		this.cacheData(0);
	}

	AssetManager.prototype.cacheData = function(index)
	{
		var thisObj = this;
		if ( !this.isSkipImages )
		{
			var directory = this.parentImagesDirectories[index].images;
			for ( var i = 0; i < directory.length; i++ )
			{
				for ( var j = 0; j < directory[i].files.length; j++ )
				{	
					this.totalImages++;
					
					var image  = new Image();
					var imPath = this.path.img + directory[i].name + directory[i].files[j],
						imName = imPath.substring( imPath.lastIndexOf( '/' ) + 1, imPath.lastIndexOf( '.' ) );
					
					image.src  = imPath;
					image.name = imName;
					 
					image.isLoaded = false;
					var imLoadFunc = function(){ thisObj.loadedImages++; this.isLoaded = true; };
					if ( image.onloadeddata != undefined ) 
						image.onloadeddata = imLoadFunc;
					else
						image.onload = imLoadFunc;
					
					this.cachedImages[ imName ] = image;
				}
			}
		}
			

		directory = this.parentImagesDirectories[index].sounds;
		
		for ( i = 0; i < directory.length; i++ )
		{
			for ( j = 0; j < directory[i].files.length; j++ )
			{
				this.totalSounds++;
				
				var soundClip = new Audio();
				var soundPath = this.path.sound + directory[i].name + directory[i].files[j],
					soundName = soundPath.substring( soundPath.lastIndexOf( '/' ) + 1, soundPath.lastIndexOf( '.' ) );
					
				soundClip.src      = soundPath;
				soundClip.isLoaded = false;
				
				var soundLoadFunc = function()
				{ 
					thisObj.loadedSounds++;
				};
				
				if ( soundClip.onloadeddata != undefined )
					soundClip.onloadeddata = soundLoadFunc;
				else
					if ( !this.isUpdateAudio )
						this.isUpdateAudio = true;
				
				this.cachedSounds[ soundName ] = soundClip;
			}
		}
	}

	AssetManager.prototype.cacheTextures = function( context )
	{
		if ( !context.isWebGL )
			return;
		
		//DO DASBOO SHIT!
		for ( var i in this.cachedImages )
		{
			var img = this.cachedImages[i];
			
			if ( img.isLoaded && typeof( this.cachedTextures[ img.name ] ) === "undefined" ) 
			{
				this.cachedTextures[ img.name ] = context.cacheTex( img );
			//	this.cachedTextures[ img.name ] = img;
				this.cachedTextures.size++;
			}
		}
	}
	
	AssetManager.prototype.isFinishedLoadingAssets = function()
	{
		if ( ( this.isSkipImages || this.loadedImages == this.totalImages ) && 
			   this.loadedSounds == this.totalSounds ) 
			return true;
			
		return false;
	}

	AssetManager.prototype.isFinishedCachingTextures = function( context )
	{
		return ( !context.isWebGL || this.cachedTextures.size == this.totalImages );
	}
	
	AssetManager.prototype.loading = function()
	{
		//check load audio files 
		if ( this.isUpdateAudio )
		{
			for ( var i = 0; i < this.soundDirectories.length; i++ )
				for ( var j = 0; j < this.soundDirectories[i].files.length; j++ )
				{
					var soundName = this.soundDirectories[i].files[j].substring( 0, this.soundDirectories[i].files[j].lastIndexOf( '.' ) );
					if ( !this.cachedSounds[ soundName ].isLoaded && this.cachedSounds[ soundName ].readyState == 4 )
						this.cachedSounds[ soundName ].isLoaded = true;	
				}
				
			this.loadedSounds = 0;
			for ( i = 0; i < this.soundDirectories.length; i++ )
				for ( j = 0; j < this.soundDirectories[i].files.length; j++ )
				{
					var soundName = this.soundDirectories[i].files[j].substring( 0, this.soundDirectories[i].files[j].lastIndexOf( '.' ) );
					if ( this.cachedSounds[ soundName ].isLoaded )
					{
						//déclanche son menu si l'asset à chargé
						if ( soundName == "title" )
						{
				//			this.cachedSounds[ soundName ].loop = true;
				//			this.cachedSounds[ soundName ].play();
						}
						
						this.loadedSounds++;
					}
				}
		}
	
		/*
		var context = this.canvas.getContext( "2d" );
		var width   = this.canvas.width,
			height  = this.canvas.height;
				
		var textY = .4 * height;
		var lingrad = context.createLinearGradient( 0, 0, 0, height );
	
		lingrad.addColorStop(0, '#157493');
		lingrad.addColorStop(1, '#64b6cb');

		// assign gradients to fill and stroke styles
		context.fillStyle = lingrad;
		// draw shapes
		context.fillRect( 0, 0, width, height );
		
		context.fillStyle = "#f3b32f";
		context.font = "30px lucida_handwritingitalic";
		context.textAlign = "center";
			
		context.fillText( "Loading Assets", width/2, textY );
		context.fillText( "Please Wait", width/2, textY + 50 );
			
		for ( var i = 0; i < this.loadCircle; i++ )
			context.fillText( ".", (width/2 + 120) + i * 10, textY + 50 );
			
		if ( this.currentFrame == 0 )
			this.loadCircle = ( this.loadCircle + 1 ) % 4;
			
		this.currentFrame = ( this.currentFrame + 1 ) % this.frameCount;
		*/
	}

	AssetManager.prototype.loadAssets = function( context )
	{
		if ( !this.isFinishedLoadingAssets() )
		{
			this.loading();
			this.cacheTextures( context );
			
			return true;
		}
	
		if ( !this.isFinishedCachingTextures( context ) )
		{
			this.cacheTextures( context )
			return true;
		}
		
		return false;
	}
	
	AssetManager.prototype.constructor = AssetManager;
	
	return AssetManager;
});