<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ContactsController extends Controller
{
       /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function connections(Request $request)
    {
        $user = $request->user();
        $users = User::where('id', '!=', $user->id)->get();
        return response()->json([
            'users' => $users,
        ]);
    }
}
