<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// controllers
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LocationController;

Route::controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::put('updateParentId/{id}', 'updateParentId');
    Route::get('retrieveChildren/{id}', 'retrieveChildren');
});

Route::controller(LocationController::class)->group(function(){
    Route::get('getAllLatestLocations', 'getAllLatestLocations');
    Route::post('addLocation', 'addLocation');
    Route::put('updateLocation', 'updateLocation');
});
