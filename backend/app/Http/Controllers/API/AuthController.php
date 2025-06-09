<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    public function register(Request $request): JsonResponse
    {
        \Log::info('Incoming registration request:', $request->all());

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'c_password' => 'required|same:password',
            'role' => 'required|in:parent,child',
            'device_id' => 'required_if:role,child|unique:users,device_id',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);

        $success['token'] = $user->createToken('authenticated')->plainTextToken;
        $success['id'] = $user->id;
        $success['name'] = $user->name;
        $success['role'] = $user->role;

        return $this->sendResponse($success, 'User Registered Successfully');
    }

    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('authenticated')->plainTextToken;
            $success['id'] = $user->id;
            $success['name'] = $user->name;
            $success['role'] = $user->role;

            return $this->sendResponse($success, 'User Login Successfully');
        } else {
            return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
        }
    }


    public function updateParentId(Request $request, string $id): JsonResponse
{
    $child = User::find($id);

    if (!$child) {
        return $this->sendError('User not found', ['error' => "No user found with ID $id"]);
    }

    $validated = $request->validate([
        'parentId' => 'required|exists:users,id', 
    ]);

    $child->parent_id = $validated['parentId'];
    $child->save();

    return $this->sendResponse($child, 'Parent ID updated successfully');
}

public function retrieveChildren(Request $request, string $id): JsonResponse
{
    $children = User::where('parent_id', $id)
                    ->where('role', 'child')
                    ->get();

    return $this->sendResponse($children, 'Children retrieved successfully');
}


}
