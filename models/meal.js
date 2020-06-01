class Meal {
    constructor(id,categoryIds,title,desctiption,imageUrl,ingredients,steps,USER_NAME,USER_IMG,USER_ID)
    {
        this.id=id,
        this.categoryIds=categoryIds,
        this.title=title,
        this.desctiption=desctiption
        this.imageUrl=imageUrl,
        this.ingredients=ingredients,
        this.steps=steps,
        this.USER_NAME=USER_NAME,
        this.USER_IMG=USER_IMG,
        this.USER_ID=USER_ID
    }
}

export default Meal;