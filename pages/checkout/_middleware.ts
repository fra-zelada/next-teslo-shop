
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';


export async function middleware ( req: NextRequest, ev: NextFetchEvent ) {

    const session = await getToken({ req , secret: process.env.NEXTAUTH_SECRET})
    const url = req.nextUrl.clone()

    if ( !session ) {
        const requestedPage =  req.page.name;
        return NextResponse.redirect( `${ url.origin }/auth/login?p=${ requestedPage }`)
    }

    return NextResponse.next();

    // try {
    //     return NextResponse.next();

    // } catch (error) {
    //     const url = req.nextUrl.clone()
    //     return NextResponse.redirect( `${ url.origin }/`)
    // }

}

// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import { jwt } from '../../utils';


// export async function middleware ( req: NextRequest, ev: NextFetchEvent ) {

//     const { token = '' } = req.cookies;

//     try {
//         await jwt.isValidToken( token );
//         return NextResponse.next();

//     } catch (error) {
//         // NextResponse.redirect(`/auth/login?p=${ requestedPage }`)
//         const url = req.nextUrl.clone()
//         const requestedPage =  req.page.name;
//         return NextResponse.redirect( `${ url.origin }/auth/login?p=${ requestedPage }`)

//     }

// }