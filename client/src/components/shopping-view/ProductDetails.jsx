import { Avatar, AvatarFallback } from "../ui/avatar.jsx";
import { Button } from "../ui/button.jsx";
import { Dialog, DialogContent } from "../ui/dialog.jsx";
import { Separator } from "../ui/separator.jsx";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice/index.js";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/StarRating.jsx";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice/index.js";
import {toast} from "react-toastify";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);

    function handleRatingChange(getRating) {
        console.log(getRating, "getRating");

        setRating(getRating);
    }

    function handleAddToCart(getCurrentProductId, getTotalStock, url, title) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast.warning(
                        `Only ${getQuantity} quantity can be added for this item`,
                        );

                    return;
                }
            }
        }
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
                imageUrl: url,
                name: title,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast.success( "Product added to cart");
                setOpen(false);
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        setRating(0);
        setReviewMsg("");
    }

    function handleAddReview() {
        dispatch(
            addReview({
                productId: productDetails?._id,
                userId: user?.id,
                username: user?.username,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            })
        ).then((data) => {
            if (data?.payload?.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast.success("Review added successfully!");
            }
            else {
                toast.warning(data.payload?.message);
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

    console.log(reviews, "reviews");

    const averageReview =
        reviews && reviews.length > 0
            ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            reviews.length
            : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent
                className="
      w-[95vw] max-w-[95vw]
      sm:w-auto sm:max-w-[80vw]
      lg:max-w-[70vw]
      p-4 sm:p-8
      max-h-[90vh] overflow-y-auto
    "
            >
                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    <div className="relative overflow-hidden rounded-lg">
                        <img
                            src={productDetails?.imageUrl}
                            alt={productDetails?.name}
                            className="w-full object-cover aspect-[4/3] md:aspect-square max-h-[40vh] md:max-h-none"
                        />
                    </div>

                    <div>
                        <h1 className="text-xl sm:text-3xl font-extrabold">{productDetails?.name}</h1>
                        <p className="text-sm sm:text-lg text-muted-foreground mb-4 mt-3">
                            {productDetails?.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className={`text-xl sm:text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""}`}>
                                ${productDetails?.price}
                            </p>
                            {productDetails?.salePrice > 0 ? (
                                <p className="text-lg sm:text-2xl font-bold text-muted-foreground">
                                    ${productDetails?.salePrice}
                                </p>
                            ) : null}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-0.5">
                                <StarRatingComponent rating={averageReview} />
                            </div>
                            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
                        </div>

                        <div className="mt-5 mb-5 md:static sticky bottom-0 bg-background pt-3">
                            {productDetails?.totalStock === 0 ? (
                                <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
                            ) : (
                                <Button
                                    className="w-full"
                                    onClick={() =>
                                        handleAddToCart(
                                            productDetails?._id,
                                            productDetails?.totalStock,
                                            productDetails?.imageUrl,
                                            productDetails?.name
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </div>

                        <Separator />

                        <div className="max-h-[45vh] md:max-h-[300px] overflow-auto">
                            <h2 className="text-lg sm:text-xl font-bold mb-4">Reviews</h2>

                            <div className="grid gap-6">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((reviewItem) => (
                                        <div
                                            key={reviewItem?._id || `${reviewItem?.userId}-${reviewItem?.createdAt}`}
                                            className="flex gap-4"
                                        >
                                            <Avatar className="w-10 h-10 border">
                                                <AvatarFallback>
                                                    {reviewItem?.username?.[0]?.toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold">{reviewItem?.username}</h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <StarRatingComponent rating={reviewItem?.reviewValue} />
                                                </div>
                                                <p className="text-muted-foreground text-sm sm:text-base">
                                                    {reviewItem.reviewMessage}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground">No Reviews</p>
                                )}
                            </div>

                            <div className="mt-8 flex-col flex gap-2">
                                <Label>Write a review</Label>
                                <div className="flex gap-1">
                                    <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
                                </div>
                                <Input
                                    name="reviewMsg"
                                    value={reviewMsg}
                                    onChange={(event) => setReviewMsg(event.target.value)}
                                    placeholder="Write a review..."
                                />
                                <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    );
}

export default ProductDetailsDialog;
