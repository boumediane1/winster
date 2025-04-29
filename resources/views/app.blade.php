<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <title>Winster</title>
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-poppins">
{{--<div class="fixed top-0 left-0 z-50 flex w-[30px] items-center justify-center bg-gray-200 py-[2.5px] text-[12px] text-black uppercase sm:bg-red-200 md:bg-yellow-200 lg:bg-green-200 xl:bg-blue-200 2xl:bg-pink-200">--}}
{{--    <span class="block sm:hidden">all</span>--}}
{{--    <span class="hidden sm:block md:hidden">sm</span>--}}
{{--    <span class="hidden md:block lg:hidden">md</span>--}}
{{--    <span class="hidden lg:block xl:hidden">lg</span>--}}
{{--    <span class="hidden xl:block 2xl:hidden">xl</span>--}}
{{--    <span class="hidden 2xl:block">2xl</span>--}}
{{--</div>--}}

@inertia
</body>
</html>
