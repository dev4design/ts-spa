/**
 * @class Preloader
 * @author Hyunhwa Jeong <http://www.beautifulcss.com>
 * @version 1.0.0
 */
class Preloader {

    assets: any;
    whenReady: any;
    whileLoading: any;
    resCount: number;
    totalCount: number;
    completeCount: number;
    loaded: boolean;
    timer: any;

    constructor() {
        this.assets = {};
        this.whenReady = undefined;
        this.whileLoading = undefined;
        this.resCount = 0;
        this.totalCount = 0;
        this.completeCount = 0;
        this.loaded = false;

        window.setTimeout(() => {
            this._loading();
        }, 0);
    }

    /**
     * @method _loading()
     * @private
     * progression callback
     */
    private _loading() {
        if (this.whileLoading) {
            this.timer = window.setInterval(() => {
                if (this.resCount > 0) {
                    this.whileLoading();
                } else {
                    window.clearInterval(this.timer);
                    this.timer = null;
                }
            }, 100)
        }
    }

    /**
     * @method _increaseCount()
     * @private
     */
    private _increaseCount() {
        this.resCount++;
        this.totalCount++;
    }

    /**
     * @method _validateResponse()
     * @private
     * checks for valid response
     */
    private _validateResponse(res: Response) {
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res;
    }

    /**
     * @method _checkReady()
     * @private
     * keeps track of resource count and fire whenReady() callback when
     * all of the resources are loaded
     */
    private _checkReady() {
        if (this.resCount <= 0) this.loaded = true;
        if (this.resCount <= 0 && this.whenReady) {
            this.whenReady();
        }
    }

    /**
     * @method _add()
     * @private
     * adds the loaded data to the assets Array
     */
    private _add(name: string, data: any) {
        this.assets[name] = data;
        this.completeCount++;
        this.resCount--;
    }

    /**
     * @method loadImage()
     * loads image files as dom elements
     */
    public loadImage(name: string, file: string) {
        this._increaseCount();
        let img = new Image();
        img.src = file;

        img.onload = () => {
            this._add(name, img);
            this._checkReady();
        }
        img.onerror = (err) => {
            console.error(err, 'file - ' + name + ' , URL ' + file)
        }
    }
}

export { Preloader };
