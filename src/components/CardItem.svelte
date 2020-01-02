<script>
    export let title;
    export let image;
</script>

<style>
    img {
        width: 100%;
        display: block;
    }
</style>

<article>
    <img src={image} alt="" />
    <h2>{title}</h2>
</article>