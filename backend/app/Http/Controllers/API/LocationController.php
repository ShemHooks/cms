<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;


class LocationController extends BaseController
{
    public function addLocation(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            "user_id" => "required|integer|exists:users,id",
            "latitude" => "required",
            "longitude" => "required"
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        } 

        $location = Location::updateOrCreate(
            ['user_id' => $request->user_id],
        [
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]
        );

        if (!$location) {
            return $this->sendError('Cannot add location now', 500);
        }

        return $this->sendResponse($location, 'Location added successfully.');
    }

    public function updateLocation(Request $request, string $id): JsonResponse
    {
        $location = Location::where('user_id', $id)->first();

        if (!$location) {
            return $this->sendError('Location not found for user ID: ' . $id, 404);
        }

        $location->update($request->all());

        return $this->sendResponse($location, 'Location updated successfully.');
    }

    public function getAllLatestLocations(string $id): JsonResponse
    {
    
    $parent = User::find($id);
    
    if (!$parent) {
        return $this->sendError('Parent not found', 404);
    }

   $locations = $parent->childrenLocation()
                ->with('user:id,name')
                ->orderByDesc('recorded_at')
                ->get();


    if($locations->isEmpty()){
        return $this->sendError('No location found',404);
    }

    return $this->sendResponse($locations,'children location');

}

    
}
