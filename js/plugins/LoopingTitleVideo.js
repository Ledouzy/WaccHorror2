/*:
 * @target MZ
 * @plugindesc v1.1 Title videos (random or single), sequential pre-title videos, a main title logo with effects, and additional logos with effects.
 *
 * @author Paradajz
 *
 * @help
 * ============================================================================ 
 * LoopingTitleVideo v1.2
 * ============================================================================
 * 1) Allows multiple (optional) pre-title videos to play in sequence before
 *    showing the title screen.
 * 2) Lets you specify a single title video or a list of videos from which one
 *    is chosen randomly each time you go to the title screen.
 * 3) Main title logo is fully configurable: position, fade, scale, rotation,
 *    bobbing, shaking, color-shift, wave distortion.
 * 4) Additional pictures (logos) can be added, each with its own effect
 *    settings (like fade, scale, rotate, etc.).
 * 5) Plugin command "Change Title Video" allows you to override the title video
 *    at runtime (e.g., after finishing a chapter, you can set a new title video).
 *
 * ----------------------------------------------------------------------------
 * INSTRUCTIONS:
 * ----------------------------------------------------------------------------
 * 1) Place this plugin in your /js/plugins folder.
 * 2) In the Plugin Manager:
 *    - "Default Title Video": a single file name with extension (e.g. Title.mp4).
 *    - "Default Title Video List": an array of strings (file names with extension).
 *      One is picked randomly if you fill this array.
 *    - "Pre-Title Videos": a string array of filenames that play in sequence
 *      before the title screen. Leave empty for none.
 * 3) Main Title Logo:
 *    - "Main Title Logo": choose an image file from /img/pictures plus effect
 *      options such as fade, scale, rotate, colorShift, waveDistortion, etc.
 * 4) Additional Pictures:
 *    - Add multiple "Additional Pictures," each with similar effect options.
 * 5) Plugin Command:
 *    - "Change Title Video": sets a single file as the title background video.
 *      This overrides any random selection or default video until changed again.
 *
 * ----------------------------------------------------------------------------
 * NOTES:
 * ----------------------------------------------------------------------------
 * - For web browsers, videos typically must be muted to autoplay. Pre-title
 *   videos are muted for safer playback. Title screen videos are also muted.
 * - If a video fails to load or is blocked, the plugin logs an error and moves on.
 * - Combining multiple advanced effects (e.g., wave + color shift + rotate + scale
 *   + bob) can lower performance on weaker machines. Test thoroughly.
 *
 * ----------------------------------------------------------------------------
 * TERMS OF USE:
 * ----------------------------------------------------------------------------
 * - Free to use and modify in both commercial and non-commercial RPG Maker MZ
 * - Please Credit Paradajz
 * ============================================================================
 * 
 * @param defaultVideo
 * @text Default Title Video
 * @type string
 * @default
 *
 * @param defaultVideoList
 * @text Default Title Video List
 * @type string[]
 * @default []
 *
 * @param preTitleVideos
 * @text Pre-Title Videos
 * @type string[]
 * @default []
 *
 * @param mainLogo
 * @text Main Title Logo
 * @type struct<TitleLogoStruct>
 * @default {}
 *
 * @param additionalPictures
 * @text Additional Pictures
 * @type struct<AdditionalLogo>[]
 * @default []
 *
 * @command changeVideo
 * @text Change Title Video
 * @arg videoFile
 * @text New Video Filename
 * @type string
 * @default
 */

/*~struct~TitleLogoStruct:
 * @param image
 * @text Image
 * @type file
 * @dir img/pictures
 * @default
 *
 * @param offsetX
 * @text X Offset
 * @type number
 * @min -2000
 * @max 2000
 * @default 0
 *
 * @param offsetY
 * @text Y Position
 * @type number
 * @min -2000
 * @max 2000
 * @default 50
 *
 * @param fade
 * @text Enable Fade
 * @type boolean
 * @default false
 *
 * @param fadeDuration
 * @text Fade Duration
 * @type number
 * @min 1
 * @default 60
 *
 * @param scale
 * @text Enable Scale
 * @type boolean
 * @default false
 *
 * @param scaleFactor
 * @text Max Scale Factor
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 1.5
 *
 * @param scaleDuration
 * @text Scale Duration
 * @type number
 * @min 1
 * @default 60
 *
 * @param rotate
 * @text Enable Rotation
 * @type boolean
 * @default false
 *
 * @param rotateSpeed
 * @text Rotation Speed (Deg/Frame)
 * @type number
 * @decimals 2
 * @min 0
 * @default 1
 *
 * @param bobbing
 * @text Enable Bobbing
 * @type boolean
 * @default false
 *
 * @param bobbingAmplitude
 * @text Bobbing Amplitude
 * @type number
 * @default 10
 *
 * @param bobbingSpeed
 * @text Bobbing Speed
 * @type number
 * @decimals 3
 * @default 0.05
 *
 * @param shake
 * @text Enable Shaking
 * @type boolean
 * @default false
 *
 * @param shakeMagnitude
 * @text Shake Magnitude
 * @type number
 * @min 0
 * @default 2
 *
 * @param colorShift
 * @text Enable Hue/Color Shift
 * @type boolean
 * @default false
 *
 * @param colorShiftSpeed
 * @text Color Shift Speed (Deg/Frame)
 * @type number
 * @decimals 2
 * @min 0
 * @default 1
 *
 * @param waveDistortion
 * @text Enable Wave Distortion
 * @type boolean
 * @default false
 *
 * @param waveAmplitude
 * @text Wave Amplitude
 * @type number
 * @decimals 3
 * @min 0
 * @default 0.01
 *
 * @param waveFrequency
 * @text Wave Frequency
 * @type number
 * @decimals 2
 * @min 0
 * @default 5.0
 *
 * @param waveSpeed
 * @text Wave Speed
 * @type number
 * @decimals 2
 * @min 0
 * @default 1.0
 */

/*~struct~AdditionalLogo:
 * @param image
 * @text Picture Image
 * @type file
 * @dir img/pictures
 * @default
 *
 * @param offsetX
 * @text X Offset
 * @type number
 * @min -2000
 * @max 2000
 * @default 0
 *
 * @param offsetY
 * @text Y Position
 * @type number
 * @min -2000
 * @max 2000
 * @default 50
 *
 * @param fade
 * @text Enable Fade
 * @type boolean
 * @default false
 *
 * @param fadeDuration
 * @text Fade Duration
 * @type number
 * @min 1
 * @default 60
 *
 * @param scale
 * @text Enable Scale
 * @type boolean
 * @default false
 *
 * @param scaleFactor
 * @text Max Scale Factor
 * @type number
 * @decimals 2
 * @min 0.1
 * @default 1.5
 *
 * @param scaleDuration
 * @text Scale Duration
 * @type number
 * @min 1
 * @default 60
 *
 * @param rotate
 * @text Enable Rotation
 * @type boolean
 * @default false
 *
 * @param rotateSpeed
 * @text Rotation Speed (Deg/Frame)
 * @type number
 * @decimals 2
 * @min 0
 * @default 1
 *
 * @param bobbing
 * @text Enable Bobbing
 * @type boolean
 * @default false
 *
 * @param bobbingAmplitude
 * @text Bobbing Amplitude
 * @type number
 * @default 10
 *
 * @param bobbingSpeed
 * @text Bobbing Speed
 * @type number
 * @decimals 3
 * @default 0.05
 *
 * @param shake
 * @text Enable Shaking
 * @type boolean
 * @default false
 *
 * @param shakeMagnitude
 * @text Shake Magnitude
 * @type number
 * @min 0
 * @default 2
 *
 * @param colorShift
 * @text Enable Hue/Color Shift
 * @type boolean
 * @default false
 *
 * @param colorShiftSpeed
 * @text Color Shift Speed (Deg/Frame)
 * @type number
 * @decimals 2
 * @min 0
 * @default 1
 *
 * @param waveDistortion
 * @text Enable Wave Distortion
 * @type boolean
 * @default false
 *
 * @param waveAmplitude
 * @text Wave Amplitude
 * @type number
 * @decimals 3
 * @min 0
 * @default 0.01
 *
 * @param waveFrequency
 * @text Wave Frequency
 * @type number
 * @decimals 2
 * @min 0
 * @default 5.0
 *
 * @param waveSpeed
 * @text Wave Speed
 * @type number
 * @decimals 2
 * @min 0
 * @default 1.0
 */

(() => {
    const pluginName = "LoopingTitleVideo";
    const p = PluginManager.parameters(pluginName);
    const defaultVideo = p["defaultVideo"] || "";
    const defaultVideoList = JSON.parse(p["defaultVideoList"] || "[]");
    const preTitleVideos = JSON.parse(p["preTitleVideos"] || "[]");
    const mainLogoData = JSON.parse(p["mainLogo"] || "{}");
    const additionalPictures = JSON.parse(p["additionalPictures"] || "[]").map(e => JSON.parse(e));

    PluginManager.registerCommand(pluginName, "changeVideo", args => {
        $gameSystem.setTitleVideo(args.videoFile);
    });

    const _Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
    Scene_Boot.prototype.startNormalGame = function() {
        if (preTitleVideos.length > 0) {
            SceneManager.goto(Scene_PreTitle);
        } else {
            _Scene_Boot_startNormalGame.call(this);
        }
    };

    function Scene_PreTitle() { this.initialize(...arguments); }
    Scene_PreTitle.prototype = Object.create(Scene_Base.prototype);
    Scene_PreTitle.prototype.constructor = Scene_PreTitle;
    Scene_PreTitle.prototype.initialize = function() { Scene_Base.prototype.initialize.call(this); };
    Scene_PreTitle.prototype.create = function() {
        Scene_Base.prototype.create.call(this);
        this._index = 0;
        this._videos = preTitleVideos;
        this.playNextVideo();
    };
    Scene_PreTitle.prototype.playNextVideo = function() {
        if (this._index >= this._videos.length) {
            SceneManager.goto(Scene_Title);
            return;
        }
        const path = "movies/" + this._videos[this._index];
        const ve = document.createElement("video");
        ve.src = path;
        ve.preload = "auto";
        ve.loop = false;
        ve.muted = true;
        const sp = new PIXI.Sprite(PIXI.Texture.from(ve));
        sp.width = Graphics.width;
        sp.height = Graphics.height;
        this.addChild(sp);
        ve.onended = () => { this._index++; this.removeChild(sp); this.playNextVideo(); };
        ve.onerror = () => { this._index++; this.removeChild(sp); this.playNextVideo(); };
        ve.play().catch(() => { this._index++; this.removeChild(sp); this.playNextVideo(); });
    };

    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.call(this);
        this.createBackgroundVideo();
        this.moveVideoToBack();
        this.createMainLogo();
        this.createAdditionalLogos();
    };

    function pickTitleVideo() {
        const override = $gameSystem.getTitleVideo();
        if (override) return override;
        if (defaultVideoList.length > 0) {
            const i = Math.floor(Math.random() * defaultVideoList.length);
            return defaultVideoList[i];
        }
        return defaultVideo;
    }

    
    Scene_Title.prototype.createBackgroundVideo = function() {
        const vf = pickTitleVideo();
        if (vf) {
            const fp = this.getVideoPath(vf);
            if (fp) {
                const ve = document.createElement("video");
                ve.src = fp;
                ve.preload = "auto";
                ve.loop = true;
                ve.muted = true;
                this._backgroundVideo = new PIXI.Sprite(PIXI.Texture.from(ve));
                const app = Graphics.app || PIXI.Application.shared;
                const sw = Graphics.width;
                const sh = Graphics.height;
                
                let vw = ve.videoWidth || sw;
                let vh = ve.videoHeight || sh;
                this._backgroundVideo.width  = vw;
                this._backgroundVideo.height = vh;
                this._backgroundVideo.x = (sw - this._backgroundVideo.width) / 2;
                this._backgroundVideo.y = (sh - this._backgroundVideo.height) / 2;
                
                ve.addEventListener("loadedmetadata", () => {
                    vw = ve.videoWidth || sw;
                    vh = ve.videoHeight || sh;
                    scale = Math.max(sw / vw, sh / vh);
                    this._backgroundVideo.width  = vw * scale;
                    this._backgroundVideo.height = vh * scale;
                    this._backgroundVideo.x = (sw - this._backgroundVideo.width) / 2;
                    this._backgroundVideo.y = (sh - this._backgroundVideo.height) / 2;
                });
                this.addChild(this._backgroundVideo);
                ve.addEventListener("canplaythrough", () => { ve.play().catch(()=>{}); });
            }
        }
    };

    Scene_Title.prototype.moveVideoToBack = function() {
        if (this._backgroundVideo) {
            this.removeChild(this._backgroundVideo);
            this.addChildAt(this._backgroundVideo, 0);
        }
    };

    Scene_Title.prototype.createMainLogo = function() {
        if (!mainLogoData.image) return;
        const bmp = ImageManager.loadPicture(mainLogoData.image);
        this._mainLogoSprite = new Sprite(bmp);
        this._mainLogoSprite.anchor.x = 0.5;
        this._mainLogoSprite.x = Graphics.width / 2 + Number(mainLogoData.offsetX || 0);
        this._mainLogoSprite.y = Number(mainLogoData.offsetY || 50);
        if (mainLogoData.fade === "true") this._mainLogoSprite.opacity = 0; else this._mainLogoSprite.opacity = 255;
        this._mainLogoSprite.scale.x = 1;
        this._mainLogoSprite.scale.y = 1;
        this._mainLogoSettings = {
            baseX: this._mainLogoSprite.x,
            baseY: this._mainLogoSprite.y,
            fade: mainLogoData.fade === "true",
            fadeDir: 1,
            fadeDuration: Number(mainLogoData.fadeDuration || 60),
            scale: mainLogoData.scale === "true",
            scaleDir: 1,
            scaleFactor: Number(mainLogoData.scaleFactor || 1.5),
            scaleDuration: Number(mainLogoData.scaleDuration || 60),
            rotate: mainLogoData.rotate === "true",
            rotateSpeed: Number(mainLogoData.rotateSpeed || 1),
            bobbing: mainLogoData.bobbing === "true",
            bobbingAmplitude: Number(mainLogoData.bobbingAmplitude || 10),
            bobbingSpeed: Number(mainLogoData.bobbingSpeed || 0.05),
            shake: mainLogoData.shake === "true",
            shakeMagnitude: Number(mainLogoData.shakeMagnitude || 2),
            colorShift: mainLogoData.colorShift === "true",
            colorShiftSpeed: Number(mainLogoData.colorShiftSpeed || 1),
            waveDistortion: mainLogoData.waveDistortion === "true",
            waveAmplitude: Number(mainLogoData.waveAmplitude || 0.01),
            waveFrequency: Number(mainLogoData.waveFrequency || 5.0),
            waveSpeed: Number(mainLogoData.waveSpeed || 1.0),
            hueAngle: 0,
            shakeX: 0,
            shakeY: 0
        };
        const f = [];
        if (this._mainLogoSettings.waveDistortion) f.push(createWaveFilter(this._mainLogoSettings.waveAmplitude, this._mainLogoSettings.waveFrequency, this._mainLogoSettings.waveSpeed));
        if (this._mainLogoSettings.colorShift) f.push(createHueFilter());
        if (f.length > 0) this._mainLogoSprite.filters = f;
        this.addChild(this._mainLogoSprite);
    };

    Scene_Title.prototype.createAdditionalLogos = function() {
        this._additionalLogosData = [];
        for (let i = 0; i < additionalPictures.length; i++) {
            const d = additionalPictures[i];
            const bmp = ImageManager.loadPicture(d.image);
            const s = new Sprite(bmp);
            s.anchor.x = 0.5;
            s.x = Graphics.width / 2 + Number(d.offsetX || 0);
            s.y = Number(d.offsetY || 50);
            if (d.fade === "true") s.opacity = 0; else s.opacity = 255;
            s.scale.x = 1;
            s.scale.y = 1;
            const o = {
                baseX: s.x,
                baseY: s.y,
                fade: d.fade === "true",
                fadeDir: 1,
                fadeDuration: Number(d.fadeDuration || 60),
                scale: d.scale === "true",
                scaleDir: 1,
                scaleFactor: Number(d.scaleFactor || 1.5),
                scaleDuration: Number(d.scaleDuration || 60),
                rotate: d.rotate === "true",
                rotateSpeed: Number(d.rotateSpeed || 1),
                bobbing: d.bobbing === "true",
                bobbingAmplitude: Number(d.bobbingAmplitude || 10),
                bobbingSpeed: Number(d.bobbingSpeed || 0.05),
                shake: d.shake === "true",
                shakeMagnitude: Number(d.shakeMagnitude || 2),
                colorShift: d.colorShift === "true",
                colorShiftSpeed: Number(d.colorShiftSpeed || 1),
                waveDistortion: d.waveDistortion === "true",
                waveAmplitude: Number(d.waveAmplitude || 0.01),
                waveFrequency: Number(d.waveFrequency || 5.0),
                waveSpeed: Number(d.waveSpeed || 1.0),
                hueAngle: 0,
                shakeX: 0,
                shakeY: 0
            };
            const f = [];
            if (o.waveDistortion) f.push(createWaveFilter(o.waveAmplitude, o.waveFrequency, o.waveSpeed));
            if (o.colorShift) f.push(createHueFilter());
            if (f.length > 0) s.filters = f;
            this.addChild(s);
            this._additionalLogosData.push({ sprite: s, settings: o });
        }
    };

    const _Scene_Title_update = Scene_Title.prototype.update;
    Scene_Title.prototype.update = function() {
        _Scene_Title_update.call(this);
        this.updateMainLogo();
        this.updateAdditionalLogos();
    };

    Scene_Title.prototype.updateMainLogo = function() {
        if (!this._mainLogoSprite) return;
        const s = this._mainLogoSprite;
        const o = this._mainLogoSettings;
        if (o.fade) {
            const half = o.fadeDuration / 2;
            const rate = 255 / half;
            s.opacity += rate * o.fadeDir;
            if (s.opacity > 255) { s.opacity = 255; o.fadeDir = -1; }
            else if (s.opacity < 0) { s.opacity = 0; o.fadeDir = 1; }
        }
        if (o.scale) {
            const half = o.scaleDuration / 2;
            const dif = (o.scaleFactor - 1.0);
            const rate = dif / half;
            s.scale.x += rate * o.scaleDir;
            s.scale.y += rate * o.scaleDir;
            if (s.scale.x > o.scaleFactor) { s.scale.x = o.scaleFactor; s.scale.y = o.scaleFactor; o.scaleDir = -1; }
            else if (s.scale.x < 1.0) { s.scale.x = 1.0; s.scale.y = 1.0; o.scaleDir = 1; }
        }
        if (o.rotate) {
            const r = o.rotateSpeed * (Math.PI / 180);
            s.rotation += r;
        }
        if (o.bobbing) {
            const t = Graphics.frameCount * o.bobbingSpeed;
            const off = Math.sin(t) * o.bobbingAmplitude;
            s.x = o.baseX + o.shakeX;
            s.y = o.baseY + off + o.shakeY;
        }
        if (o.shake) {
            o.shakeX = (Math.random() * o.shakeMagnitude * 2) - o.shakeMagnitude;
            o.shakeY = (Math.random() * o.shakeMagnitude * 2) - o.shakeMagnitude;
            if (!o.bobbing) {
                s.x = o.baseX + o.shakeX;
                s.y = o.baseY + o.shakeY;
            }
        } else {
            o.shakeX = 0;
            o.shakeY = 0;
        }
        if (o.colorShift && s.filters) {
            for (let f of s.filters) {
                if (f.uniforms && f.uniforms.uHue !== undefined) {
                    const r = o.colorShiftSpeed * (Math.PI / 180);
                    o.hueAngle += r;
                    if (o.hueAngle > Math.PI * 2) o.hueAngle -= Math.PI * 2;
                    f.uniforms.uHue = o.hueAngle;
                }
            }
        }
        if (o.waveDistortion && s.filters) {
            for (let f of s.filters) {
                if (f.uniforms && f.uniforms.uTime !== undefined) {
                    f.uniforms.uTime += 1;
                }
            }
        }
    };

    Scene_Title.prototype.updateAdditionalLogos = function() {
        if (!this._additionalLogosData) return;
        for (let obj of this._additionalLogosData) {
            const s = obj.sprite;
            const o = obj.settings;
            if (o.fade) {
                const half = o.fadeDuration / 2;
                const rate = 255 / half;
                s.opacity += rate * o.fadeDir;
                if (s.opacity > 255) { s.opacity = 255; o.fadeDir = -1; }
                else if (s.opacity < 0) { s.opacity = 0; o.fadeDir = 1; }
            }
            if (o.scale) {
                const half = o.scaleDuration / 2;
                const dif = (o.scaleFactor - 1.0);
                const rate = dif / half;
                s.scale.x += rate * o.scaleDir;
                s.scale.y += rate * o.scaleDir;
                if (s.scale.x > o.scaleFactor) { s.scale.x = o.scaleFactor; s.scale.y = o.scaleFactor; o.scaleDir = -1; }
                else if (s.scale.x < 1.0) { s.scale.x = 1.0; s.scale.y = 1.0; o.scaleDir = 1; }
            }
            if (o.rotate) {
                const r = o.rotateSpeed * (Math.PI / 180);
                s.rotation += r;
            }
            if (o.bobbing) {
                const t = Graphics.frameCount * o.bobbingSpeed;
                const off = Math.sin(t) * o.bobbingAmplitude;
                s.x = o.baseX + o.shakeX;
                s.y = o.baseY + off + o.shakeY;
            }
            if (o.shake) {
                o.shakeX = (Math.random() * o.shakeMagnitude * 2) - o.shakeMagnitude;
                o.shakeY = (Math.random() * o.shakeMagnitude * 2) - o.shakeMagnitude;
                if (!o.bobbing) {
                    s.x = o.baseX + o.shakeX;
                    s.y = o.baseY + o.shakeY;
                }
            } else {
                o.shakeX = 0;
                o.shakeY = 0;
            }
            if (o.colorShift && s.filters) {
                for (let f of s.filters) {
                    if (f.uniforms && f.uniforms.uHue !== undefined) {
                        const r = o.colorShiftSpeed * (Math.PI / 180);
                        o.hueAngle += r;
                        if (o.hueAngle > Math.PI * 2) o.hueAngle -= Math.PI * 2;
                        f.uniforms.uHue = o.hueAngle;
                    }
                }
            }
            if (o.waveDistortion && s.filters) {
                for (let f of s.filters) {
                    if (f.uniforms && f.uniforms.uTime !== undefined) {
                        f.uniforms.uTime += 1;
                    }
                }
            }
        }
    };

    Scene_Title.prototype.getVideoPath = function(file) {
        const exts = [".mp4",".webm",".ogg"];
        const lower = file.toLowerCase();
        if (exts.some(e=>lower.endsWith(e))) return "movies/" + file;
        for (let e of exts) {
            const tp = "movies/" + file + e;
            if (Utils.isOptionValid("test") || Utils.isNwjs()) {
                const fs = require("fs");
                if (fs.existsSync(tp)) return tp;
            } else {
                return tp;
            }
        }
        return null;
    };

    const _Scene_Title_terminate = Scene_Title.prototype.terminate;
    Scene_Title.prototype.terminate = function() {
        _Scene_Title_terminate.call(this);
        if (this._backgroundVideo) this._backgroundVideo.destroy(true);
    };

    Game_System.prototype.setTitleVideo = function(file) { this._titleVideo = file; };
    Game_System.prototype.getTitleVideo = function() { return this._titleVideo; };

    function createWaveFilter(a,f,s) {
        return new PIXI.Filter(undefined,`
            precision mediump float;
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float uTime;
            uniform float uAmplitude;
            uniform float uFrequency;
            uniform float uSpeed;
            void main(void){
                float w = sin((vTextureCoord.y+uTime*uSpeed)*uFrequency)*uAmplitude;
                vec2 d = vec2(vTextureCoord.x+w,vTextureCoord.y);
                gl_FragColor=texture2D(uSampler,d);
            }
        `,{uTime:0,uAmplitude:a,uFrequency:f,uSpeed:s});
    }

    function createHueFilter() {
        return new PIXI.Filter(undefined,`
            precision mediump float;
            varying vec2 vTextureCoord;
            uniform sampler2D uSampler;
            uniform float uHue;
            void main(void){
                vec4 c=texture2D(uSampler,vTextureCoord);
                float ca=cos(uHue);
                float sa=sin(uHue);
                mat3 r=mat3(
                    0.213+ca*0.787 - sa*0.213,0.715-ca*0.715 - sa*0.715,0.072-ca*0.072 + sa*0.928,
                    0.213-ca*0.213 + sa*0.143,0.715+ca*0.285 + sa*0.140,0.072-ca*0.072 - sa*0.283,
                    0.213-ca*0.213 - sa*0.787,0.715-ca*0.715 + sa*0.715,0.072+ca*0.928 + sa*0.072
                );
                c.rgb=c.rgb*r;
                gl_FragColor=c;
            }
        `,{uHue:0});
    }
})();
